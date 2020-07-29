import React from 'react';
import img from '../assets/projects.jpg';

export default function Header() {
    return (
        <header>
            <img src={img} width={50} height={50} />
            <h1>App demo - Projects - React/NodeJS/Webpack</h1>
        </header>
    )
}