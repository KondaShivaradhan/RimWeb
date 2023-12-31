import React, { useState } from "react";
import { DeleteThis } from "../Misc/BackedFunc";
import { Decrypt } from "../Misc/Constants";
import { User } from "firebase/auth";
import { UserRecord } from "../Misc/interfaces";
import { Link, GoogleDriveLogo } from "@phosphor-icons/react";

interface ChildProps {
  record: UserRecord;
}

interface YourComponentProps {
  user: User
  records: UserRecord[];
}
export function ChildComponent({ record }: ChildProps) {
  console.log(record);
  // @ts-ignore
  const parsedFiles = record.media.map((jsonString) => JSON.parse(jsonString));
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
          console.error(error);
        }
      })();
  };
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return (

    <div className=" overflow-auto max-w-sm p-6 max-h-50 min-h-30 rounded-lg shadowf flex flex-col space-y-2 bg-gray-800 border-gray-700 ">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{record.title}</h5>
      <p className="overflow-auto h-25 font-normal text-gray-700 dark:text-gray-400">
        {record.description.split(urlRegex).map((part, index) => (
          index % 2 === 0 ? (
            part
          ) : (
            <a className="text-red-500" key={index} href={part} target="_blank" rel="noopener noreferrer">
              <Link />
              {part}
            </a>
          )
        ))}
      </p>
      <div>
      {record.tags.map((tag, index) => (
        <span className="bg-blue-100 text-blue-800 text-lg font-medium me-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">{tag}</span>
      ))}
      </div>
      <div className="flex flex-row self-center justify-center" >
        {parsedFiles.map((t, index) => (
          <a href={t.url}>

            <button className="flex flex-row flex-nowrap items-center gap-2
            cursor-pointer transition-all bg-gray-400 text-white px-2 py-1 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
              <img height={20} width={20} src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg"></img>
              {t.name.split('.').pop()}
            </button>
          </a>

        ))}
      </div>

      <button
        onClick={() => {
          handleDeleteClick(record.ruid);
        }}
      >
        delete
      </button>
      <button
        onClick={() => {

        }}
      >
        Edit
      </button>
    </div>

  );
}
function Search({ records, user }: YourComponentProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<UserRecord[]>([]);
  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
    if (query.trim() === "") {
      setSearchResults(records);
    } else {
      const filteredResults = records.filter((record) => {
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
    <>
      <div>
          <input 
            onChange={(e) => handleSearch(e.target.value.toLowerCase())}
            placeholder="Search..."
            value={searchQuery}
          type="search" id="search" className=" p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>

      <div className="container flex my-16 flex-row flex-wrap justify-evenly gap-8">
        {searchQuery.trim() === ""
          ? records.map((record, index) => (

            <ChildComponent record={record} key={index} />

          ))
          : searchResults.map((record, index) => (
            <ChildComponent record={record} key={index} />
          ))}
      </div>
    </>
  );
}

export default Search;
