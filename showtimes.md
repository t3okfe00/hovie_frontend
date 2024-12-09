# Showtimes Page Documentation

## Overview
The Showtimes page is a dynamic movie listing and scheduling system that allows users to view current movies, upcoming releases, and detailed showtimes across different theaters. The interface features three main tabs: Now Showing, Showtimes, and Coming Soon.

## Features

### 1. Navigation Tabs
- **Now Showing**: Displays currently playing movies
- **Showtimes**: Shows detailed scheduling information
- **Coming Soon**: Lists upcoming movie releases

### 2. Filtering System
The page includes comprehensive filtering options:
- Theater selection (for Now Showing and Showtimes)
- Date selection (for Now Showing and Showtimes)
- Genre filtering (for Now Showing and Coming Soon)
- Sorting options (alphabetical or chronological)

### 3. Movie Information Display
Each movie card shows:
- Movie title
- Duration
- Age rating
- Genre information
- Release date
- Movie poster
- Short description

### 4. Showtime Details
Showtime cards include:
- Start and end times
- Theater and hall information
- Language and subtitle information
- Available seats
- Screening format (2D/3D)
- Direct ticket purchase link

## Technical Implementation

### State Management
```typescript
interface TabState {
  theater: string;
  date: string;
  genre: string;
  sort: string;
}
```

The application maintains independent state for each tab using the TabState interface.

### Data Fetching
The system fetches data from three main endpoints:
1. Theater listings: `https://www.finnkino.fi/xml/TheatreAreas/`
2. Movie events: `https://www.finnkino.fi/xml/Events`
3. Schedules: `https://www.finnkino.fi/xml/Schedule`

### Components

#### 1. MovieCard
Displays movie information in a card format with:
- Poster image
- Title
- Duration
- Genre
- Age rating
- Description

#### 2. ShowtimeCard
Shows detailed screening information:
- Time and duration
- Theater and hall
- Language and subtitles
- Seat availability
- Ticket purchasing option

#### 3. Filters
Provides filtering options:
- Theater dropdown
- Date selector
- Genre filter
- Sort options

## User Interface

### Layout
- Responsive design with mobile-first approach
- Dark theme with gradient background
- Card-based content presentation
- Clear visual hierarchy

### Visual Elements
- Loading spinner for data fetching
- Smooth animations for tab transitions
- Interactive hover states
- Clear call-to-action buttons

## Performance Considerations

1. **Data Loading**
   - Implements loading states
   - Uses AnimatePresence for smooth transitions
   - Efficient data filtering and sorting

2. **State Management**
   - Independent tab states to prevent unnecessary rerenders
   - Optimized filter updates
   - Cached theater and genre data

## Error Handling
- Graceful fallbacks for missing data
- User-friendly error messages
- Network error handling

## Usage Example

```typescript
// Updating tab state
updateTabState('NOW SHOWING', { 
  theater: 'theater1',
  date: '2024-01-01',
  genre: 'Action',
  sort: 'alphabetical'
});

// Fetching movie data
await fetchMovies('NowInTheatres', currentState);
```

## Best Practices
1. Kept filter states independent for each tab
2. Implemented loading states for better UX
3. Used proper error handling
4. Maintained consistent date formatting
5. Implemented responsive design
6. Caches frequently used data
7. Used proper TypeScript types
8. Implemented smooth animations
