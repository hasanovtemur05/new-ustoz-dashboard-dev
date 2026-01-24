import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import AuthForm from './Forms/AuthForm'

const Auth = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome to UstozAI Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
    </Card>
  )
}

export default Auth;