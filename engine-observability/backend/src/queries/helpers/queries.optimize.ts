import { Injectable } from '@nestjs/common';
import { NullableType } from 'src/utils/types/nullable.type';
import { Query } from '../domain/queries';
import { QueryOptimizationFlags } from '../domain/query-optimizations';
import { QueriesRepository } from '../infrastructure/persistence/queries.repository';

@Injectable()
export class QueryOptimizer {
  constructor(private readonly queriesRepository: QueriesRepository) {}

  private getPattern(clause: string): string {
    let pattern: string = '';

    if (clause === 'SELECT') {
      pattern = '\\bSELECT\\b\\s+([\\s\\S]*?)(?=\\s+\\bFROM\\b)';
    }

    if (clause === 'WHERE') {
      pattern = 'WHERE\\s+([\\s\\S]*?)(GROUP BY|ORDER BY|$)';
    }

    return pattern;
  }

  private getQueryClauses(
    query: string | undefined,
    clause: string,
  ): string[] | null {
    const pattern = this.getPattern(clause);
    if (!query || pattern.length == 0) {
      return null;
    }
    const regex = new RegExp(pattern, 'gi'); // Global and case-insensitive matching
    const matches = query.match(regex);
    if (matches && matches.length > 0) {
      // Strip whitespace from each capturing group and return the list
      const clauses = matches
        .map((match) => {
          return match.trim();
        })
        .filter((clause) => clause !== '');
      return clauses.length > 0 ? clauses : null;
    }
    return null;
  }

  private getPartitionKey(
    stageInfoString: string | null | undefined,
  ): string | null {
    let stageInfoJson;
    if (!stageInfoString) {
      console.error('No stage info string provided');
      return null;
    }

    try {
      stageInfoJson = JSON.parse(stageInfoString);
    } catch (e) {
      console.error('Invalid JSON string provided');
      return null;
    }

    while (stageInfoJson.subStages && stageInfoJson.subStages.length > 0) {
      stageInfoJson = stageInfoJson.subStages[0];
    }

    let root = stageInfoJson.plan.root;

    while (root.source) {
      root = root.source;
    }

    let partitionKey: string | null = null;

    try {
      partitionKey = JSON.parse(root.table.connectorHandle.partitionSpecJson)
        .fields[0].name;
    } catch (e) {
      console.error(
        'getPartitionKey() failed to find a partition key at the expected location.',
      );
      return null;
    }

    return partitionKey;
  }

  private hasPartitionKey(query: NullableType<Query>): boolean {
    // This function should be modified to check if the partition key is included only on subqueries with source tables.
    const whereClauses = this.getQueryClauses(query?.query, 'WHERE');

    // Pick up here by implementing this next function.
    const partitionKey = this.getPartitionKey(query?.stage_info_json);

    if (partitionKey && whereClauses) {
      for (const whereClause of whereClauses) {
        if (whereClause.toLowerCase().includes(partitionKey.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }

  private hasSelectStar(query: NullableType<Query>): boolean {
    const selectClauses = this.getQueryClauses(query?.query, 'SELECT');
    if (!selectClauses) {
      return false;
    }
    for (const selectClause of selectClauses) {
      // This can be made more robust by checking the actual stage info vs the text.
      if (
        selectClause.includes('*') &&
        !selectClause.toLowerCase().includes('count(*)')
      ) {
        return true;
      }
    }
    return false;
  }

  private findSubqueries(query: string | undefined): string[] | null {
    const pattern = '\\(\\s*(SELECT\\b[\\s\\S]*?\\bFROM\\b[\\s\\S]*?(?=\\)))';
    const regex = new RegExp(pattern, 'gi'); // Global and case-insensitive matching
    const matches = query?.match(regex);
    return (
      matches?.map(
        (match) =>
          match
            .replace(/^\s*\(/, '') // Remove leading whitespace and opening parentheses
            .replace(/\s+/g, ' ') // Replace one or more whitespace characters with a single space
            .trim() // Remove leading and trailing whitespace
            .replace(/\)+$/, ''), // Remove trailing closing parentheses
      ) || null
    );
  }

  private async checkSubQueries(query: NullableType<Query>): Promise<boolean> {
    const subqueries = this.findSubqueries(query?.query);
    if (!subqueries) {
      return false;
    }

    for (let subquery of subqueries) {
      subquery = subquery.replace(/'/g, "\\'");
      const queryCount =
        await this.queriesRepository.countQueriesBySubquery(subquery);
      if (queryCount > 0) {
        return true;
      }
    }
    return false;
  }

  private hasCrossJoin(query: NullableType<Query>): boolean {
    const stageInfoString = query?.stage_info_json;
    if (!stageInfoString) {
      console.error('No stage info string provided');
      return false;
    }

    let stageInfoJson;

    try {
      stageInfoJson = JSON.parse(stageInfoString);
    } catch (e) {
      console.error('Invalid JSON string provided');
      return false;
    }

    return JSON.stringify(stageInfoJson).toLowerCase().includes('crossjoin');
  }

  public async optimizeQuery(
    query: NullableType<Query>,
  ): Promise<NullableType<QueryOptimizationFlags>> {
    const has_partition_key = this.hasPartitionKey(query);
    const has_select_star = this.hasSelectStar(query);
    const check_sub_queries = await this.checkSubQueries(query);
    const has_cross_join = this.hasCrossJoin(query);

    const queryOptimizationFlags = new QueryOptimizationFlags(
      has_partition_key,
      has_select_star,
      check_sub_queries,
      has_cross_join,
    );
    return queryOptimizationFlags;
  }
}
