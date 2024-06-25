import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Button,
  Divider,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import useFetchData from "../hooks/useFetchData";
import AutocompleteField from "./AutocompleteField";
import RadioGroupField from "./RadioGroupField";
import CustomTextField from "./CustomTextField";

const RegisterForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [changwat, setChangwat] = useState([]);
  const [amphur, setAmphur] = useState([]);
  const [tambon, setTambon] = useState([]);
  const [zipcode, setZipcode] = useState("");
  const [selectedChangwat, setSelectedChangwat] = useState("");
  const [selectedAmphur, setSelectedAmphur] = useState("");
  const [selectedTambon, setSelectedTambon] = useState("");
  const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false);

  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [addresses, setAddresses] = useState([
    {
      type: "now",
      houseNumber: "",
      village: "",
      tambon: "",
      amphur: "",
      changwat: "",
      zipcode: "",
    },
    {
      type: "old",
      houseNumber: "",
      village: "",
      tambon: "",
      amphur: "",
      changwat: "",
      zipcode: "",
    },
  ]);

  const { data: prefixes } = useFetchData(
    "http://172.18.1.41:4000/",
    `{ prefix { id title } }`
  );
  const { data: countryData } = useFetchData(
    "http://172.18.1.41:4000/",
    `{ countries { name numeric alpha2 enName } }`
  );
  const countries = countryData?.countries || [];

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_revert_tambon_with_amphure_province.json"
    )
      .then((response) => response.json())
      .then((data) => setTambon(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDateChange = (date) => {
    if (date && dayjs(date).isValid()) {
      setSelectedDate(date);
      const currentDate = dayjs();
      const ageYears = currentDate.diff(date, "year");
      date = dayjs(date).add(ageYears, "year");
      const ageMonths = currentDate.diff(date, "month");
      date = dayjs(date).add(ageMonths, "month");
      const ageDays = currentDate.diff(date, "day");
      setBirthYear(ageYears);
      setBirthMonth(ageMonths);
      setBirthDay(ageDays);
    } else {
      console.error("Invalid date:", date);
    }
  };

  const handleSelectChange = (setter) => (event) => setter(event.target.value);

  const handleCheckboxChange = (event) => {
    setSameAsCurrentAddress(event.target.checked);
    if (event.target.checked) {
      const currentAddress = addresses.find(
        (address) => address.type === "now"
      );
      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address.type === "old" ? { ...currentAddress, type: "old" } : address
        )
      );
    } else {
      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address.type === "old"
            ? {
                type: "old",
                houseNumber: "",
                village: "",
                tambon: "",
                amphur: "",
                changwat: "",
                zipcode: "",
              }
            : address
        )
      );
    }
  };

  const updateAddress = (addressType, field, value) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.type === addressType ? { ...address, [field]: value } : address
      )
    );
  };

  const handleAddressChange = (addressType, field) => (event) =>
    updateAddress(addressType, field, event.target.value);

  const handleChangwatChange = (addressType) => (event) => {
    const selectedChangwatId = event.target.value;
    setSelectedChangwat(selectedChangwatId);
    const selectedChangwatObj = tambon.find(
      (item) => item.changwat.id === selectedChangwatId
    );
    if (selectedChangwatObj) {
      setAmphur(selectedChangwatObj.amphure);
      setTambon([]);
      setSelectedAmphur("");
      setSelectedTambon("");
      setZipcode("");
      updateAddress(
        addressType,
        "changwat",
        selectedChangwatObj.changwat.name_th
      );
    }
  };

  const handleAmphurChange = (addressType) => (event) => {
    const selectedAmphurId = event.target.value;
    setSelectedAmphur(selectedAmphurId);
    const selectedAmphurObj = amphur.find(
      (item) => item.amphur.id === selectedAmphurId
    );
    if (selectedAmphurObj) {
      setTambon(selectedAmphurObj.tambon);
      setSelectedTambon("");
      setZipcode("");
      updateAddress(addressType, "amphur", selectedAmphurObj.amphur.name_th);
    }
  };

  const handleTambonChange = (addressType) => (event) => {
    const selectedTambonId = event.target.value;
    setSelectedTambon(selectedTambonId);
    const selectedTambonObj = tambon.find(
      (item) => item.tambon.id === selectedTambonId
    );
    if (selectedTambonObj) {
      const {
        tambon: { name_th: tambonName, zip_code },
        amphur: { id: amphurId, name_th: amphurName },
        changwat: { id: changwatId, name_th: changwatName },
      } = selectedTambonObj;
      setSelectedAmphur(amphurId);
      setSelectedChangwat(changwatId);
      setZipcode(zip_code);

      updateAddress(addressType, "tambon", tambonName);
      updateAddress(addressType, "amphur", amphurName);
      updateAddress(addressType, "changwat", changwatName);
      updateAddress(addressType, "zipcode", zip_code);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", addresses);
    // Add logic to send the data to the GraphQL endpoint
  };

  const genHNCode = () => {};

  return (
    <Card>
      <CardHeader title='บัตรประจำตัวผู้รับบริการ คลินิกพิเศษฯ สคร.1 เชียงใหม่' />
      <Divider sx={{ m: "0 !important" }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <CustomTextField
                label='เลขบัตรประชาชน'
                placeholder='15002001xxxxx'
                name='CID'
              />
            </Grid>
            <Grid item xs={2}>
              <CustomTextField label='Passport No' placeholder='A123456' />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={2}>
              <CustomTextField label='HN' placeholder='' value={``} />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <AutocompleteField
                label='คำนำหน้า'
                value={selectedChangwat}
                onChange={handleSelectChange(setSelectedChangwat)}
                options={prefixes.prefix || []}
                displayField='title'
              />
            </Grid>
            <Grid item xs={3}>
              <CustomTextField label='ชื่อ' placeholder='John' />
            </Grid>
            <Grid item xs={2}>
              <CustomTextField label='ชื่อกลาง' placeholder='D.' />
            </Grid>
            <Grid item xs={3}>
              <CustomTextField label='นามสกุล' placeholder='Doe' />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='วันเดือนปีเกิด'
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <CustomTextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                label='อายุ'
                value={`${birthYear} ปี ${birthMonth} เดือน ${birthDay} วัน`}
                disabled
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={2} className='ml-8'>
              <RadioGroupField
                label='เพศ'
                value={selectedChangwat}
                onChange={handleSelectChange(setSelectedChangwat)}
                options={[
                  { value: "ชาย", label: "ชาย" },
                  { value: "หญิง", label: "หญิง" },
                ]}
              />
            </Grid>
            <Grid item xs={6} className='ml-8'>
              <RadioGroupField
                label='สถานะสมรส'
                value={selectedChangwat}
                onChange={handleSelectChange(setSelectedChangwat)}
                options={[
                  { value: "โสด", label: "โสด" },
                  { value: "หย่าร้าง", label: "หย่าร้าง" },
                  { value: "สมรส", label: "สมรส" },
                  { value: "หม้าย", label: "หม้าย" },
                ]}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <CustomTextField label='เบอร์โทรศัพท์' />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField label='อีเมล์' />
            </Grid>
          </Grid>
        </CardContent>
        <AddressSection
          addressType='now'
          addresses={addresses}
          handleAddressChange={handleAddressChange}
          handleChangwatChange={handleChangwatChange}
          handleAmphurChange={handleAmphurChange}
          handleTambonChange={handleTambonChange}
          changwat={changwat}
          amphur={amphur}
          tambon={tambon}
          countries={countries}
        />
        <AddressSection
          addressType='old'
          addresses={addresses}
          handleAddressChange={handleAddressChange}
          handleChangwatChange={handleChangwatChange}
          handleAmphurChange={handleAmphurChange}
          handleTambonChange={handleTambonChange}
          changwat={changwat}
          amphur={amphur}
          tambon={tambon}
          countries={countries}
          sameAsCurrentAddress={sameAsCurrentAddress}
          handleCheckboxChange={handleCheckboxChange}
        />
        <Divider sx={{ m: "0 !important" }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            บันทึกข้อมูล
          </Button>
          <Button
            type='reset'
            size='large'
            color='secondary'
            variant='outlined'
          >
            ยกเลิก
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

const AddressSection = ({
  addressType,
  addresses,
  handleAddressChange,
  handleChangwatChange,
  handleAmphurChange,
  handleTambonChange,
  changwat,
  amphur,
  tambon,
  countries,
  sameAsCurrentAddress,
  handleCheckboxChange,
}) => {
  const currentAddress = addresses.find(
    (address) => address.type === addressType
  );
  return (
    <>
      <CardContent>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography variant='h6' sx={{ fontWeight: 400 }}>
                {addressType === "now"
                  ? "ที่อยู่ปัจจุบัน"
                  : "ที่อยู่ตามทะเบียนบ้าน"}
              </Typography>
            </Grid>
            {addressType === "old" && (
              <Grid item xs={8}>
                <FormControlLabel
                  sx={{ ml: -4 }}
                  control={
                    <Checkbox
                      checked={sameAsCurrentAddress}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='เหมือนที่อยู่ปัจจุบัน'
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </CardContent>
      <CardContent>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CustomTextField
                label='บ้านเลขที่'
                value={currentAddress.houseNumber}
                onChange={handleAddressChange(addressType, "houseNumber")}
                disabled={sameAsCurrentAddress && addressType === "old"}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomTextField
                label='หมู่'
                value={currentAddress.village}
                onChange={handleAddressChange(addressType, "village")}
                disabled={sameAsCurrentAddress && addressType === "old"}
              />
            </Grid>
            <Grid item xs={4}>
              <AutocompleteField
                label='ตำบล'
                value={currentAddress.tambon}
                onChange={handleTambonChange(addressType)}
                options={tambon}
                displayField='name_th'
                disabled={sameAsCurrentAddress && addressType === "old"}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardContent>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <AutocompleteField
                label='อำเภอ'
                value={currentAddress.amphur}
                onChange={handleAmphurChange(addressType)}
                options={amphur}
                displayField='name_th'
                disabled={sameAsCurrentAddress && addressType === "old"}
              />
            </Grid>
            <Grid item xs={4}>
              <AutocompleteField
                label='จังหวัด'
                value={currentAddress.changwat}
                onChange={handleChangwatChange(addressType)}
                options={changwat}
                displayField='name_th'
                disabled={sameAsCurrentAddress && addressType === "old"}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomTextField
                label='รหัสไปรษณีย์'
                value={currentAddress.zipcode}
                onChange={handleAddressChange(addressType, "zipcode")}
                disabled={sameAsCurrentAddress && addressType === "old"}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardContent>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <AutocompleteField
                label='ประเทศ'
                value=''
                onChange={() => {}}
                options={countries}
                displayField='name'
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </>
  );
};

export default RegisterForm;
