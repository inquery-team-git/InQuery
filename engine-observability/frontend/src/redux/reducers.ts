import { combineReducers } from '@reduxjs/toolkit';

import { changelogSettingsSlice } from '@/redux/admin/changelog-settings.slice';
import { adminChangelogCreateSlice } from '@/redux/admin/changelogPost-create.slice';
import { adminChangelogEditSlice } from '@/redux/admin/changelogPost-edit.slice';
import { adminChangelogSlice } from '@/redux/admin/changelogSlice';
import { companyLabelsSlice } from '@/redux/admin/labels.slice';
import { adminMemberSlice } from '@/redux/admin/member.slice';
import { adminRolesSlice } from '@/redux/admin/role.slice';
import { authSlice } from '@/redux/auth/auth.slice';
import { publicChangelogDetailSlice } from '@/redux/public/changelog-detail.slice';
import { publicChangelogSlice } from '@/redux/public/changelogSlice';
import { publicLabelsSlice } from '@/redux/public/labels.slice';

const reducers = combineReducers({
  [adminChangelogSlice.name]: adminChangelogSlice.reducer,
  [adminChangelogEditSlice.name]: adminChangelogEditSlice.reducer,
  [adminChangelogCreateSlice.name]: adminChangelogCreateSlice.reducer,
  [publicChangelogSlice.name]: publicChangelogSlice.reducer,
  [publicLabelsSlice.name]: publicLabelsSlice.reducer,
  [publicChangelogDetailSlice.name]: publicChangelogDetailSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [adminMemberSlice.name]: adminMemberSlice.reducer,
  [adminRolesSlice.name]: adminRolesSlice.reducer,
  [changelogSettingsSlice.name]: changelogSettingsSlice.reducer,
  [companyLabelsSlice.name]: companyLabelsSlice.reducer,
});

export default reducers;
