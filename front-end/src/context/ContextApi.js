import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const context = {
    data,
    setData,
    nameFilter,
    setNameFilter,
  };

  return (
    <DataContext.Provider value={context}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider as Provider };

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};