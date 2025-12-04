// Export presenters with specific names to avoid conflicts
export { HomePresenter, HomePresenterFactory, useHomePresenter } from "./home";
export type { HomeViewModel } from "./home";

export {
  SeriesPresenter,
  SeriesPresenterFactory,
  useSeriesPresenter,
} from "./series";
export type { SeriesFilters, SeriesViewModel } from "./series";

export {
  CategoriesPresenter,
  CategoriesPresenterFactory,
  useCategoriesPresenter,
} from "./categories";
export type { CategoriesViewModel } from "./categories";

export {
  EpisodesPresenter,
  EpisodesPresenterFactory,
  useEpisodesPresenter,
} from "./admin/episodes";
export type { EpisodeFilters, EpisodesViewModel } from "./admin/episodes";
