import { useEffect, useReducer, useState } from 'react'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import OrganaizationList from './OrganaizationList'
import {allOrganaizationReducer} from '../../../reducers/organaizationReducers'
import axios from '../../../utils/axios'
import Loading from '../../loading/Loading'

function Index() {
  const {id} = useParams()
  const [division, setDivision] =useState({})
  const [{ loading, error, organaizations },dispatch ] = useReducer(allOrganaizationReducer, {
    loading: false,
    organaizations: [],
    error: "",
  });

  const getAllOrganaizationList = async () => {
    try {
      dispatch({
        type: "GET_REQUEST",
      });
      const { data } = await axios.get(`v1/admin/organaizatioByType/${id}`);
      const  division  = await axios.get(`v1/admin/division/${id}`);
      setDivision(division.data);
      
      dispatch({
        type: "GET_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "GET_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  

  useEffect(()=>{
    getAllOrganaizationList()
  },[])
 
  return (

    <Container>
        <Loading loading={loading}/>
        <OrganaizationList  row={organaizations} division={division}/>
    </Container>
  )
}

export default Index