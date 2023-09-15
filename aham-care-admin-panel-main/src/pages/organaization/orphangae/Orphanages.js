import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Table from '../../../components/table/Table';
import { TABLE_HEAD } from '../../../components/table/TableHead';
import { getOrphanges } from '../../../redux/Slices.js/orphange';
import axiosInstance from '../../../utils/axios';

function Orphanage() {
  const dispatch = useDispatch();
  const { orphanges = [] } = useSelector((state) => state.orphanage);
  const getAllOrphanges = async () => {
    const { data } = await axiosInstance.get('v1/admin/orphange');
    console.log('data=>', data);
    dispatch(getOrphanges(data.orphanges));
  };

  console.log('all old=>', orphanges);
  useEffect(() => {
    getAllOrphanges();
  }, []);
  return (
    <div>
      <Table link={'orphange'} title="Orphanges" head={TABLE_HEAD} body={orphanges} />
    </div>
  );
}

export default Orphanage;
