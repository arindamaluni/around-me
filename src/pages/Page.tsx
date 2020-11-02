import React from 'react';
import { useParams } from 'react-router';
import Form from '../components/Forms/Form';
import Events from './Events';
import './Page.css';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <>
    {name === 'newevent' && <Form postHandler={null}/>}
    {name === 'events' && <Events /> }
    </>

  );
};

export default Page;
