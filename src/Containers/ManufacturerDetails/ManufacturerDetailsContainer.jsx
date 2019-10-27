import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import Api from '../../Api';
import { Form } from '../../Components/Form';
import { Table } from '../../Components/Table';

export const ManufacturerDetailsContainer = (props, context) => {
  const [list, setList] = useState({
    headers: {
      Manufacturer: 'Make_Name',
      Model: 'Model_Name',
      Year: {
        isFixed: true,
        value: ''
      }
    },
    tableList: []
  });

  const getAllModelsFromYear = async ({ vin, year }) => {
    try {
      const { Results } = await Api().getVeicle(vin, year);
      const make = Results[0].Make || '';
      if (make) {
        const { Results } = await Api().getModelsForMakeYear(make, year);
        const table = {
          headers: {
            Manufacturer: 'Make_Name',
            Model: 'Model_Name',
            Year: {
              isFixed: true,
              value: year
            }
          },
          tableList: Results
        }
        setList(table)
      }

    } catch (error) {
      const table = {
        headers: {
          ErrorType: 'errorName',
          ErrorDetails: 'message'
        },
        tableList: [
          {
            errorName: error.name,
            message: error.message
          }
        ]
      }
      setList(table)
    }
  }

  const getAllAddressesOfManufacturer = async vin => {
    try {
      const { Results } = await Api().getVeicle(vin, '');
      const manufacturer = Results[0].Manufacturer;
      const manufacturerNameFromString = manufacturer.split(' ')[0];
      if (manufacturerNameFromString) {

        const { Results } = await Api().getManufacturerAddresses(manufacturerNameFromString);
        const table = {
          headers: {
            Manufacturer: 'Name',
            Country: 'Country'
          },
          tableList: Results
        }
        setList(table)
      }
    } catch (err) {
      const table = {
        headers: {
          ErrorType: 'errorName',
          ErrorDetails: 'message'
        },
        tableList: [
          {
            errorName: error.name,
            message: error.message
          }
        ]
      }
      setList(table)
    }
  }

  const getAllVehiclesTypeOfManufacturer = async manufacturer => {
    try {
      const { Results } = await Api().getModelsForMake(manufacturer);
      const table = {
        headers: {
          Manufacturer: 'Make_Name',
          Model: 'Model_Name'
        },
        tableList: Results
      }
      setList(table)
    } catch (error) {
      const table = {
        headers: {
          ErrorType: 'errorName',
          ErrorDetails: 'message'
        },
        tableList: [
          {
            errorName: error.name,
            message: error.message
          }
        ]
      }
      setList(table)
    }

  }

  const submitHandler = (formValues) => {
    const {
      vin = '',
      year = ''
    } = formValues;
    if (vin.length === 17 && year.length) {
      getAllModelsFromYear({ vin, year })
    } else if (vin.length === 17 && !year.length) {
      getAllAddressesOfManufacturer(vin)
    } else if (vin.length < 17 && !year.length) {
      getAllVehiclesTypeOfManufacturer(vin)
    }
  }

  return (
    <Fragment>
      <Form onSubmit={submitHandler} />
      <Table tableDetails={list} />
    </Fragment>
  );
};
