import { Game, SearchFilters } from '../types';
import { games } from '../data/games';

export const searchGames = (query: string, filters: SearchFilters = {}, sort: string = 'relevance'): Game[] => {
  let results = [...games];

  // Apply query
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(game => 
      game.title.toLowerCase().includes(lowerQuery) ||
      game.developer.toLowerCase().includes(lowerQuery) ||
      game.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Apply filters
  if (filters.genre && filters.genre !== 'all') {
    results = results.filter(game => game.genres.map(g => g.toLowerCase()).includes(filters.genre!.toLowerCase()));
  }

  if (filters.platform && filters.platform !== 'all') {
    results = results.filter(game => game.platforms.map(p => p.toLowerCase()).includes(filters.platform!.toLowerCase()));
  }

  if (filters.onSale) {
    results = results.filter(game => !!game.salePrice);
  }

  if (filters.minPrice !== undefined) {
    results = results.filter(game => (game.salePrice || game.price) >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    results = results.filter(game => (game.salePrice || game.price) <= filters.maxPrice!);
  }

  // Apply sort
  switch (sort) {
    case 'price-asc':
      results.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      break;
    case 'price-desc':
      results.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      break;
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'name':
      results.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'release-date':
      results.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      break;
    default:
      // relevance - keep original order or based on featured/trending if no query
      if (!query) {
        results.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return 0;
        });
      }
      break;
  }

  return results;
};
