import React from 'react';
import { useParams } from 'react-router-dom';

const CharacterDetailView: React.FC = () => {
    const { characterId } = useParams<{ characterId: string }>();

    return (
        <div>
            <h1>Character Details</h1>
            <p>Character ID: {characterId}</p>
        </div>
    );
};

export default CharacterDetailView;
