'use client';
import Login from '@/components/Login'
import SubscriptionForm from '@/components/SubscriptionForm';
import SubscriptionSummary from '@/components/SubscriptionSummary';
import SubscriptionsDisplay from '@/components/SubscriptionsDisplay';
import { useAuth } from '@/context/authContext';
import { Suspense, useState } from 'react';

const blankSubscription = {
  name: '',
  category: 'Entertainment',
  cost: '',
  currency: 'USD',
  billingFrequency: 'Monthly',
  paymentMethod: 'Credit Card',
  startDate: '',
  status: 'Active',
  notes: '',
  renewalType: '',
}

const dashboardPage = () => {
  const [isAddEntry, setIsAddEntry] = useState(false);

  const [formData, setFormData] = useState(blankSubscription);

  const { handleDeleteSubscription, userData, currentUser, loading } = useAuth();
  const isAuthenticated = !!currentUser;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleEditSubscription(index) {
    const data = userData.subscriptions.find((val, valIndex) => {
      return valIndex === index
    })
    setFormData(data);
    handleDeleteSubscription(index);
    setIsAddEntry(true);

  }

  function handleResetForm() {
    setFormData(blankSubscription);
  }

  function handleToggleEntry() {
    setIsAddEntry(prevState => !prevState);
  }

  if(loading) {
    return(
      <p>Loading...</p>
    )
  }

  if(!isAuthenticated) {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <Login />
      </Suspense>
      
    ) 
  }

  return (
    <>
      <SubscriptionSummary />
      <SubscriptionsDisplay handleEditSubscription={handleEditSubscription} handleShowInput={isAddEntry ? () => {} : handleToggleEntry} />
      {isAddEntry && (<SubscriptionForm handleResetForm={handleResetForm} closeInput={handleToggleEntry} formData={formData} handleChange={handleChange} />)}
    </>
  )
}

export default dashboardPage