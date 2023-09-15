import { useParams } from 'react-router-dom';
import { Container, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RequirementList from './RequirementList';
import Loading from '../../../loading/Loading';
import axios from '../../../../utils/axios';
import {notifyError} from '../../../../utils/alert';

function Requirement() {
  const {orgId} = useParams()
  const [loading, setLoading]= useState(false)
  const [requirement, setRequirement]= useState({})

  const requirementLists = async ()=>{
    try {
      setLoading(true)
      const {data} = await axios.get(`v1/admin/requirement/${orgId}`)
      setRequirement(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      notifyError(error.message);
    }
  }

  useEffect(()=>{
    requirementLists()
  },[])
  return (
    <Container>
      <Loading loading={loading}/>
      <RequirementList row={requirement} requirementLists={requirementLists} />
    </Container>
  );
}

export default Requirement;
