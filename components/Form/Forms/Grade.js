import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ControlledAccordions from '../../ui/ControlledAccordions'
import {useState ,useEffect} from 'react'
import GradeFormOption from './GradeFormOption'
import Button from '@mui/material/Button';

const {list: {HKCEE,HKALE,HKDSE,IB,IGCSE,GCEALevel,GradeBase,numberBase}} = GradeFormOption
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  export default function BasicTabs(props) {
    // const [prevSelect, setPrevSelect] = useState([]);
    // const prevSelect = [{id: 'HKCEE主科中國語文', value: 'C'},{id: 'HKCEE主科英國語文', value: 'A'}]
    // console.log(props.info.subgrade)
    const [value, setValue] = useState(0);
    const [list, setList] = useState([])

     console.log(props.info)
    useEffect(() => {
 
      // setPrevSelect(JSON.parse(props.info.subgrade))
      props.info && props.info.hasOwnProperty('subgrade')== true ? setList(JSON.parse(props.info.subgrade)):''

      // JSON.parse(props.info.subgrade) != null && setList(JSON.parse(props.info.subgrade))
      console.log(list)
      },[props.info]);


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const selectHandler= (id,value) =>{

        const existed = (id) => {
        return(list.some(
            (item) => item.id===id
        )) ;
        }
//   updating
        if(existed(id)>-1){
        const filtered = list.filter((item)=>item.id!==id).filter((item)=>item.value!=='')
            if(value!==''){
                setList([...filtered,{id:id,value:value}])
            }else{
                setList([...filtered])
            }
        }else{
        // adding
        if(value!==''){
        const newlist = [...list, {id:id,value:value}]
        setList(newlist)}
        }
        }
const submitHandler = (e) =>{
  e.preventDefault()
  console.log(list)
  props.submitHandler(list,'subgrade')
}


    return (
      
      <Box sx={{ width: '100%' }}>
        <h2>公閞試成績</h2>
        <form  onSubmit={submitHandler}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="HKCEE" {...a11yProps(0)} />
            <Tab label="HKALE" {...a11yProps(1)} />
            <Tab label="HKDSE" {...a11yProps(2)} />
            <Tab label="IB" {...a11yProps(3)} />
            <Tab label="IGCSE" {...a11yProps(4)} />
            <Tab label="GCE A Level" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <ControlledAccordions cat={HKCEE} key='HKCEE' childKey='HKCEE' choiceHandler={selectHandler} select={GradeBase} prevSelect={JSON.parse(props.info.subgrade)}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <ControlledAccordions cat={HKALE} key='HKALE' childKey='HKALE' choiceHandler={selectHandler} select={GradeBase} prevSelect={JSON.parse(props.info.subgrade)}/>  
        </TabPanel>
        <TabPanel value={value} index={2}>
            <ControlledAccordions cat={HKDSE} key='HKDSE' childKey='HKDSE' choiceHandler={selectHandler} select={numberBase} prevSelect={JSON.parse(props.info.subgrade)}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <ControlledAccordions cat={IB} key='IB' childKey='IB' choiceHandler={selectHandler} select={GradeBase} prevSelect={JSON.parse(props.info.subgrade)}/>
        </TabPanel>
        <TabPanel value={value} index={4}>
            <ControlledAccordions cat={IGCSE} key='IGCSE' childKey='IGCSE' choiceHandler={selectHandler} select={GradeBase} prevSelect={JSON.parse(props.info.subgrade)}/>
        </TabPanel>
        <TabPanel value={value} index={5}>
            <ControlledAccordions cat={GCEALevel} key='GCE A Level' childKey='GCE A Level' choiceHandler={selectHandler} select={GradeBase} prevSelect={JSON.parse(props.info.subgrade)}/>
        </TabPanel>
        <Button variant="outlined" type="submit">儲存</Button >
          <Button variant="outlined" type="submit">儲存並下一步</Button >
        </form>
      </Box>
    );
  }