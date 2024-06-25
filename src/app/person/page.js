// src/app/person.js
"use client";
import React, { useState } from "react";
import { Card, CardHeader } from "@mui/material";
import useFetchPatients from "../../hooks/useFetchPatients";
import PatientDataGrid from "../../components/PatientDataGrid";
import SearchBar from "../../components/SearchBar";
import EditModal from "../../components/EditModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useData } from "../../context/DataContext";
import { useRouter } from "next/navigation";

const PersonPage = () => {
  const router = useRouter();
  const { setData } = useData();
  const { data, loading } = useFetchPatients();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(searchValue, "i");
    const filteredRows = data.filter((row) =>
      Object.keys(row).some((field) => searchRegex.test(row[field]?.toString()))
    );
    setFilteredData(searchValue.length ? filteredRows : []);
  };

  const swalWithBootstrapButtons = withReactContent(
    Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    })
  );

  const handleEdit = (id) => {
    const person = data.find((p) => p.id === id);
    setData(person);
    router.push("/test");
    // setSelectedPerson(person);
    // setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setFilteredData(data.filter((p) => p.id !== id));
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "The record has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your record is safe :)",
            "error"
          );
        }
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Card className='p-4 shadow-lg rounded-xl'>
        <CardHeader
          title='Person List'
          action={
            <SearchBar searchText={searchText} handleSearch={handleSearch} />
          }
          className='mb-4'
        />
        <PatientDataGrid
          data={filteredData.length ? filteredData : data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Card>
      <EditModal
        isModalOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        selectedPerson={selectedPerson}
      />
    </>
  );
};

export default PersonPage;
