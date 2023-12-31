import { useState } from "react";
import { DeleteThis } from "../Misc/BackedFunc";
import {  extractDomain } from "../Misc/Constants";
import { User } from "firebase/auth";
import { UserRecord } from "../Misc/interfaces";
import {  Globe, Pencil, Trash } from "@phosphor-icons/react";

interface ChildProps {
  record: UserRecord;
}
const t = "group cursor-pointer bg-cyan-800 p-2 rounded-lg outline-none text-purple-50 hover:bg-slate-200 hover:text-cyan-600 hover:scale-110 duration-300"
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
      <div className="overflow-auto h-25 font-normal text-yellow-100 flex flex-row flex-wrap">
        {record.description.split(urlRegex).map((part, index) => (
          index % 2 === 0 ? (
            <div>{part + " "}</div>
          ) : (
            <div className=" flex w-fit flex-row gap-0 items-center">
              <Globe />
              <a className="text-red-500" key={index} href={part} target="_blank" rel="noopener noreferrer">
                {extractDomain(part)}
              </a>
            </div>

          )
        ))}
      </div>
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
      <div className="flex flex-row flex-nowrap gap-3 justify-center">
        <button
          className={t}

          onClick={() => {
            handleDeleteClick(record.ruid);
          }}
        >
          <Pencil />
        </button>
        <button
          className={t}

          onClick={() => {
            handleDeleteClick(record.ruid);
          }}
        >
          <Trash />
        </button>
      </div>

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
      <div className="flex items-center justify-center p-5">
        <div className="rounded-lg bg-gray-200 ">
          <div className="flex">

            <input
              onChange={(e) => handleSearch(e.target.value.toLowerCase())}
              placeholder="Search..."
              value={searchQuery}
              type="search" id="search"
              className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-2.5 checked:bg-emerald-500" />
          </div>
        </div>
      </div>

      <div className="container flex my-16 flex-row flex-wrap justify-evenly gap-4">
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
