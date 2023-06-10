import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore([]);

describe('App', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      films: [
        {
          title: 'Film 1',
          director: 'Director 1',
          producer: 'Producer 1',
          release_date: '2023-01-01',
        },
        {
          title: 'Film 2',
          director: 'Director 2',
          producer: 'Producer 2',
          release_date: '2023-02-01',
        },
        {
          title: 'Film 3',
          director: 'Director 3',
          producer: 'Producer 3',
          release_date: '2023-03-01',
        },
      ],
      loading: false,
      error: null,
    };

    store = mockStore(initialState);
  });

  it('renders the sort button and search bar', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('SORT BY')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by title or release date...')).toBeInTheDocument();
  });

  it('displays the film table with the correct number of rows', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const filmRows = screen.getAllByRole('row');

    // Exclude the table header row
    expect(filmRows.length - 1).toBe(initialState.films.length);
  });

  it('sorts the films in ascending order when the sort button is clicked', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const sortButton = screen.getByText('SORT BY');
    fireEvent.click(sortButton);

    await waitFor(() => {
      const filmRows = screen.getAllByRole('row');

      // Exclude the table header row
      expect(filmRows.length - 1).toBe(initialState.films.length);

      // Check if the films are sorted in ascending order based on release date
      for (let i = 1; i < filmRows.length; i++) {
        const currentFilmDate = filmRows[i].querySelectorAll('td')[4].textContent;
        const previousFilmDate = filmRows[i - 1].querySelectorAll('td')[4].textContent;
        expect(new Date(currentFilmDate)).toBeGreaterThan(new Date(previousFilmDate));
      }
    });
  });

  it('filters the films based on the search input', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search by title or release date...');
    fireEvent.change(searchInput, { target: { value: 'Film 1' } });

    await waitFor(() => {
      const filmRows = screen.getAllByRole('row');

      // Exclude the table header row
      expect(filmRows.length - 1).toBe(1);
    });
  });

  it('displays the film details when a row is clicked', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const filmRow = screen.getAllByRole('row')[1]; // Assuming the first film row is clicked
    fireEvent.click(filmRow);

    await waitFor(() => {
      expect(screen.getByText('Film 1')).toBeInTheDocument();
      expect(screen.getByAltText('Image')).toBeInTheDocument();
      expect(screen.getByText('Directed by: Director 1')).toBeInTheDocument();
    });
  });
});
