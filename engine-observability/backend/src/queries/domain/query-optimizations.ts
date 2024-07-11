export class QueryOptimizationFlags {
  recommendations: {
    flag: string;
    recommendation: string;
  }[];

  constructor(
    has_partition_key: boolean,
    has_select_star: boolean,
    check_sub_queries: boolean,
    has_cross_join: boolean,
  ) {
    const recommendations: any[] = [];
    if (has_partition_key) {
      recommendations.push({
        flag: 'has_partition_key',
        recommendation:
          'This query is not performing a full table scan and has successfully projected for only a small subset of the available columns in the source tables.',
      });
    }
    if (has_select_star) {
      recommendations.push({
        flag: 'has_select_star',
        recommendation:
          'This query is does not have a filter against the partition column for either table. Try adding a filter condition to reduce overall read time.',
      });
    }
    if (check_sub_queries) {
      recommendations.push({
        flag: 'check_sub_queries',
        recommendation:
          'This query is casting INTEGER column as a DECIMAL type. Few other historical queries have done this as well. Consider rewriting the column as a DECIMAL type to avoid redundant computations.',
      });
    }
    if (has_cross_join) {
      recommendations.push({
        flag: 'has_cross_join',
        recommendation:
          'This query is performing a full cross-join. Try adding a more restrictive filter to either or both tables to achieve faster performance.',
      });
    }
    this.recommendations = recommendations;
  }
}
