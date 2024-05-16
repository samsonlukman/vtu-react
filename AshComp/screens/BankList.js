import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import axios from 'axios';

const BankList = () => {
  const [banks, setBanks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBanks, setFilteredBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://api.flutterwave.com/v3/banks/NG", {
          headers: {
            Authorization: "FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X",
          },
        });
        setBanks(response.data.data);
        setFilteredBanks(response.data.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = banks.filter(bank => bank.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredBanks(filtered);
  };

  return (
    <View>
      <TextInput
        placeholder="Search banks"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={filteredBanks}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
};

export default BankList;
