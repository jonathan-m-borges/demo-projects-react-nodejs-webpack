import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState('');
    const [owner, setOwner] = useState('');

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const project = { title, owner };
        setTitle('');
        setOwner('');
        api.post('/projects', project).then(
            response => {
                setProjects([...projects, response.data]);
            }
        )
    }

    return (
        <>
            <h2>Projects</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Owner</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(p => <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.title}</td>
                        <td>{p.owner}</td>
                    </tr>)}
                </tbody>
            </table>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="title">Title:</label>
                    <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="title">Owner:</label>
                    <input name="owner" value={owner} onChange={(e) => setOwner(e.target.value)} />
                </p>
                <p>
                    <input type="submit" value="Adicionar"></input>
                </p>
            </form>
            <ul>

            </ul>
        </>
    )
}