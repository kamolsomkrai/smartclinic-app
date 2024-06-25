import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ProvinceFilter = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_revert_tambon_with_amphure_province.json"
      );
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.name_th?.includes(query) ||
      item.amphure?.name_th?.includes(query) ||
      item.amphure?.province?.name_th?.includes(query)
  );

  const options = filteredData.map((item) => ({
    id: item.id,
    label: `${item.name_th} >> ${item.amphure?.name_th} >> ${item.amphure?.province?.name_th} >> ${item.zip_code}`,
  }));

  const handleInputChange = (event, value) => {
    setQuery(value);
  };

  return (
    <div>
      <Autocomplete
        options={options}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField {...params} label='ค้นหา...' variant='outlined' />
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.label}
      />
    </div>
  );
};

export default ProvinceFilter;
