import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from '../components/MovieCard';
import ShowtimeCard from '../components/ShowtimeCard';
import Filters from '../components/Filters';
import type { Movie, Showtime, Theater } from '../types/showtimetypes';




const TABS = ['NOW SHOWING', 'SHOWTIMES', 'COMING SOON'] as const;
type Tab = typeof TABS[number];

interface TabState {
  theater: string;
  date: string;
  genre: string;
  sort: string;
}

export default function Showtimes() {
  const [activeTab, setActiveTab] = useState<Tab>('NOW SHOWING');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  // Independent state for each tab
  const [tabStates, setTabStates] = useState<Record<Tab, TabState>>({
    'NOW SHOWING': {
      theater: '',
      date: new Date().toISOString().split('T')[0],
      genre: '',
      sort: 'alphabetical'
    },
    'SHOWTIMES': {
      theater: '',
      date: new Date().toISOString().split('T')[0],
      genre: '',
      sort: 'alphabetical'
    },
    'COMING SOON': {
      theater: '',
      date: new Date().toISOString().split('T')[0],
      genre: '',
      sort: 'alphabetical'
    }
  });

  useEffect(() => {
    fetchTheaters();
  }, []);

  useEffect(() => {
    const currentState = tabStates[activeTab];
    
    if (activeTab === 'NOW SHOWING') {
      fetchMovies('NowInTheatres', currentState);
    } else if (activeTab === 'COMING SOON') {
      fetchMovies('ComingSoon', currentState);
    } else if (activeTab === 'SHOWTIMES') {
      fetchShowtimes(currentState);
    }
  }, [activeTab, tabStates[activeTab]]);

  const updateTabState = (tab: Tab, updates: Partial<TabState>) => {
    setTabStates(prev => ({
      ...prev,
      [tab]: { ...prev[tab], ...updates }
    }));
  };

  async function fetchTheaters() {
    try {
      const response = await fetch('https://www.finnkino.fi/xml/TheatreAreas/');
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');

      const areas = Array.from(xmlDoc.getElementsByTagName('TheatreArea')).map(
        (area: Element) => ({
          id: area.getElementsByTagName('ID')[0]?.textContent || '',
          name: area.getElementsByTagName('Name')[0]?.textContent || 'Unknown',
        })
      );

      setTheaters(areas);

      // Set default theater for each tab
      if (areas.length > 0) {
        setTabStates(prev => ({
          'NOW SHOWING': { ...prev['NOW SHOWING'], theater: areas[0].id },
          'SHOWTIMES': { ...prev['SHOWTIMES'], theater: areas[0].id },
          'COMING SOON': { ...prev['COMING SOON'], theater: areas[0].id }
        }));
      }
    } catch (error) {
      console.error('Error fetching theaters:', error);
    }
  }

  async function fetchMovies(listType: 'NowInTheatres' | 'ComingSoon', state: TabState) {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        listType,
        ...(state.theater && listType === 'NowInTheatres' && { area: state.theater }),
        includeVideos: 'true',
        includeLinks: 'false',
        includeGallery: 'false',
        includePictures: 'false',
      });

      const response = await fetch(`https://www.finnkino.fi/xml/Events?${params}`);
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');

      const events = Array.from(xmlDoc.getElementsByTagName('Event')).map((event: Element) => ({
        id: event.getElementsByTagName('ID')[0]?.textContent || '',
        title: event.getElementsByTagName('Title')[0]?.textContent || 'Unknown',
        duration: `${Math.floor(Number(event.getElementsByTagName('LengthInMinutes')[0]?.textContent || '0') / 60)}h ${
          Number(event.getElementsByTagName('LengthInMinutes')[0]?.textContent || '0') % 60
        }min`,
        releaseDate: event.getElementsByTagName('dtLocalRelease')[0]?.textContent || 'Unknown',
        ageRating: event.getElementsByTagName('Rating')[0]?.textContent || 'N/A',
        image: event.getElementsByTagName('EventSmallImagePortrait')[0]?.textContent || '',
        genre: event.getElementsByTagName('Genres')[0]?.textContent || 'Unknown',
        description: event.getElementsByTagName('ShortSynopsis')[0]?.textContent || '',
      }));

      const uniqueGenres = Array.from(
        new Set(
          events
            .map((event) => event.genre.split(','))
            .flat()
            .map((genre) => genre.trim())
            .filter(Boolean)
        )
      ).sort();

      setGenres(uniqueGenres);

      if (listType === 'NowInTheatres') {
        const scheduleResponse = await fetch(
          `https://www.finnkino.fi/xml/Schedule?area=${state.theater}&dt=${formatDate(state.date)}`
        );
        const scheduleText = await scheduleResponse.text();
        const scheduleXml = parser.parseFromString(scheduleText, 'text/xml');
        
        const showingEventIds = new Set(
          Array.from(scheduleXml.getElementsByTagName('Show')).map(
            (show) => show.getElementsByTagName('EventID')[0]?.textContent || ''
          )
        );

        const filteredEvents = events.filter((event) => showingEventIds.has(event.id));
        setMovies(filteredEvents);
      } else {
        setMovies(events);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchShowtimes(state: TabState) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.finnkino.fi/xml/Schedule?area=${state.theater}&dt=${formatDate(state.date)}`
      );
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');

      const shows = Array.from(xmlDoc.getElementsByTagName('Show')).map((show: Element) => ({
        time: new Date(show.getElementsByTagName('dttmShowStart')[0]?.textContent || '').toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        endTime: new Date(show.getElementsByTagName('dttmShowEnd')[0]?.textContent || '').toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        theater: show.getElementsByTagName('Theatre')[0]?.textContent || 'Unknown',
        hall: show.getElementsByTagName('TheatreAuditorium')[0]?.textContent || 'Unknown',
        language: show.getElementsByTagName('PresentationMethodAndLanguage')[0]?.textContent || 'Unknown',
        title: show.getElementsByTagName('Title')[0]?.textContent || 'Unknown',
        poster: show.getElementsByTagName('EventSmallImagePortrait')[0]?.textContent || '',
        subtitles: show.getElementsByTagName('PresentationMethodAndLanguage')[0]?.textContent || '',
        available: `${show.getElementsByTagName('SeatsAvailable')[0]?.textContent || '0'} seats available`,
        is2D: (show.getElementsByTagName('PresentationMethodAndLanguage')[0]?.textContent || '').includes('2D'),
        ageRating: show.getElementsByTagName('Rating')[0]?.textContent || 'N/A',
        ticketUrl: show.getElementsByTagName('ShowURL')[0]?.textContent || '#',
      }));

      const sortedShows = [...shows].sort((a, b) => {
        if (state.sort === 'alphabetical') {
          return a.title.localeCompare(b.title);
        } else {
          return a.time.localeCompare(b.time);
        }
      });
      
      setShowtimes(sortedShows);
    } catch (error) {
      console.error('Error fetching showtimes:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${date.getFullYear()}`;
  }

  function getFilteredAndSortedMovies() {
    const currentState = tabStates[activeTab];
    let filteredMovies = movies;
    
    if (currentState.genre) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre.toLowerCase().includes(currentState.genre.toLowerCase())
      );
    }

    return filteredMovies.sort((a, b) => {
      if (currentState.sort === 'alphabetical') {
        return a.title.localeCompare(b.title);
      } else {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      }
    });
  }

  const currentState = tabStates[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto">
          <div className="inline-flex bg-gray-800/50 rounded-lg shadow-lg p-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`px-8 py-3 font-medium text-sm rounded-lg transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <Filters
          showTheaterFilter={activeTab !== 'COMING SOON'}
          showDateFilter={activeTab === 'NOW SHOWING' || activeTab === 'SHOWTIMES'}
          showGenreFilter={activeTab === 'NOW SHOWING' || activeTab === 'COMING SOON'}
          showSortFilter={true}
          selectedTheater={currentState.theater}
          selectedDate={currentState.date}
          selectedGenre={currentState.genre}
          selectedSort={currentState.sort}
          theaters={theaters}
          genres={genres}
          onTheaterChange={(value) => updateTabState(activeTab, { theater: value })}
          onDateChange={(value) => updateTabState(activeTab, { date: value })}
          onGenreChange={(value) => updateTabState(activeTab, { genre: value })}
          onSortChange={(value) => updateTabState(activeTab, { sort: value })}
        />

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[400px]"
            >
              <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {activeTab === 'NOW SHOWING' || activeTab === 'COMING SOON' ? (
                getFilteredAndSortedMovies().length > 0 ? (
                  getFilteredAndSortedMovies().map((movie) => <MovieCard key={movie.id} {...movie} />)
                ) : (
                  <div className="text-gray-400 text-center">No movies available for the selected filters.</div>
                )
              ) : showtimes.length > 0 ? (
                showtimes.map((show, index) => <ShowtimeCard key={index} {...show} />)
              ) : (
                <div className="text-gray-400 text-center">No showtimes available for the selected date and theater.</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}