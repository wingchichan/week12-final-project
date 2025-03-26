'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const SearchInput = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue) {
      router.push(`/all-calendars?q=${inputValue}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search__input">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Search calendars"
      />
    </div>
  );
};

