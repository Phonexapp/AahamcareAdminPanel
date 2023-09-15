import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../../components/table/Table';
import { TABLE_HEAD } from '../../../components/table/TableHead';
import axiosInstance from '../../../utils/axios';
import { allOrganaizationReducer } from '../../../reducers/organaizationReducers';
import Loading from '../../../components/loading/Loading';

function OrganazationList() {
  
  const {id} = useParams('id')
  console.log('id org',id);
  // =========================== 
  const [{ loading, error, organaizations },dispatch ] = useReducer(allOrganaizationReducer, {
    loading: false,
    organaizations: [],
    error: "",
  });

  const getAllList = async () => {
    try {
      dispatch({
        type: "ORG_REQUEST",
      });
      const { data } = await axiosInstance.get(`v1/admin/organaizatioByType/${id}`);
      
      dispatch({
        type: "ORG_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ORG_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  // ===========================

  useEffect(() => {
    getAllList();
  }, []);

  console.log('organaizations=>',organaizations);

  return (
    <div>
      <Loading loading={loading}/>
      <Table id={id} link={'oldageHome'} title="Division" head={TABLE_HEAD} body={organaizations} />
    </div>
  );
}

export default OrganazationList;
