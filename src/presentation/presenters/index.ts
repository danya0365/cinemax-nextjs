// Export presenters with specific names to avoid conflicts
export { HomePresenter, useHomePresenter } from "./home";
export type { HomeViewModel } from "./home";

export { SeriesPresenter, useSeriesPresenter } from "./series";
export type { SeriesFilters, SeriesViewModel } from "./series";

export { CategoriesPresenter, useCategoriesPresenter } from "./categories";
export type { CategoriesViewModel } from "./categories";

export { EpisodesPresenter, useEpisodesPresenter } from "./admin/episodes";
export type { EpisodeFilters, EpisodesViewModel } from "./admin/episodes";
