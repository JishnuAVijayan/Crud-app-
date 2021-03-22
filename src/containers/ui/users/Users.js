import React from 'react';
import UserForm from '../../../componentes/ui/Forms/UserForm';
import Headers from '../../../componentes/ui/Headers/Headers';
import ThemeContextProvider from '../../../contexts/ThemeContext';
import ThemeToggle from '../../../Toggle/ThemeToggle';

const Users = () => {
    return (
        <div>
            <ThemeContextProvider>
                <Headers />
                <UserForm />
                <ThemeToggle />
            </ThemeContextProvider>
        </div>
    )
}

export default Users;
