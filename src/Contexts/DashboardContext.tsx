import { createContext } from 'react';
import { UserSearchInfo } from '../utils/api/types';

export type DashboardContextType = {
  refreshSearches: () => void;
  refreshLoading: boolean;
  setSearches: (searches: UserSearchInfo[]) => void;
};

export const DashboardContext = createContext<DashboardContextType>({
  refreshSearches: () => {},
  setSearches(searches: UserSearchInfo[]) {
    console.log(searches);
  },
  refreshLoading: false,
});
