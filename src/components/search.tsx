import React, { useState } from "react";
import { DeleteThis } from "../Misc/BackedFunc";
import FileComp from "./FileComp";

interface Record {
  title: string;
  id: string;
  description: string;
  tags: string[];
  media: string[];
}

interface ChildProps {
  record: Record;
}

interface YourComponentProps {
  records: Record[];
}
export function ChildComponent({ record }: ChildProps) {
  const handleDeleteClick = (id: any) => {
    /* eslint-disable no-restricted-globals */
    confirm("Do you want to delete this Record?") &&
      (() => {
        try {
          let output = {
            id: id,
          };
          DeleteThis(output)
            .then((message: string) => {
              console.log(message);
            })
            .catch((error: any) => {
              console.error(error);
            });
        } catch (error) {
          // Handle any synchronous errors here
          console.error(error);
        }
      })();
  };

  return (
    <div style={{ margin: 10, textAlign: "center" }}>
      <h3>Title: {record.title}</h3>
      <p>Description: {record.description}</p>

      {record.tags.map((tag, index) => (
        <p style={{ background: "" }} key={index}>
          {tag}
        </p>
      ))}
      {record.media &&
        record.media.map((m, index) => (
          <>
            <p>here is the file</p>
            <FileComp key={index} filePath={m}></FileComp>
          </>
        ))}

      <button
        onClick={() => {
          handleDeleteClick(record.id);
        }}
      >
        delete
      </button>
      <button
        onClick={() => {
          handleDeleteClick(record.id);
        }}
      >
        Edit
      </button>
    </div>
  );
}
function Search({ records }: YourComponentProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Record[]>([]);

  // Function to handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
    if (query.trim() === "") {
      // If the query is empty, display all records
      setSearchResults(records);
    } else {
      // Filter records based on the search query
      const filteredResults = records.filter((record) => {
        // Check if the title, description, or tags contain the search query
        return (
          record.title.toLowerCase().includes(query) ||
          record.description.toLowerCase().includes(query) ||
          record.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      });
      setSearchResults(filteredResults);
    }
  };

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value.toLowerCase())}
      />

      {/* Display search results or all records */}
      {searchQuery.trim() === ""
        ? records.map((record, index) => (
            <>
              <ChildComponent record={record} key={index} />
              <hr />
            </>
          ))
        : searchResults.map((record, index) => (
            <ChildComponent record={record} key={index} />
          ))}
    </div>
  );
}

export default Search;
