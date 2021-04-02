import { Location } from '../../models/Location';
import { Schedule, Session } from '../../models/Schedule';
export interface ConfState {
  schedule: Schedule;
  sessions: Session[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  menuEnabled: boolean;
}
