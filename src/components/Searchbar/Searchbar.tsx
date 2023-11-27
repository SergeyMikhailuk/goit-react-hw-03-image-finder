import { Component } from 'react';
import { Formik, Form, Field } from 'formik';

import { ReactComponent as SearchIcon } from 'images/search.svg';

const initialValues = {
  search: '',
};

class Searchbar extends Component<SearchbarProps, SearchbarState> {
  state = {
    search: '',
  };

  render() {
    const { onSubmit } = this.props;

    return (
      <header className="Searchbar">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="SearchForm">
            <button type="submit" className="SearchForm-button">
              <SearchIcon fill={'#7d7d7d'} width={24} height={24} />
              <span className="SearchForm-button-label">Search</span>
            </button>

            <Field
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              name="search"
              placeholder="Search images and photos"
            />
          </Form>
        </Formik>
      </header>
    );
  }
}

export default Searchbar;

export type SearchbarState = {
  search: string;
};

type SearchbarProps = {
  onSubmit: (p: SearchbarState) => void;
};
