import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CharacterDetail({ characterId, onClose }) {
    const[character, setCharacter] = useState({});
    const [error, setError] = useState(null);

    const publicKey = '1048eba09bf1439030cbb22e58cf28a1'
    const hash = '3f97cb072c6c68aa83ec263283955534' // ts + privateKey + publicKey
    const apiURL = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${publicKey}&hash=${hash}`;

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const response = await axios.get(apiURL);
                const fetchedCharacter = response.data.data.results[0];
                setCharacter(fetchedCharacter);
                console.log(fetchedCharacter)
            } catch (err) {
                setError('Failed to fetch data');
            }
        };

        fetchCharacterDetails();
    }, [apiURL]);

    if (error) return <p>{error}</p>;
    if (!character.name) return <p>Fetching details...</p>;

    return (
        <div className="character-detail">
             <h2>{character.name}</h2>
             <p>{character.description || "No description available"}</p>
             <h3>Associated Comics</h3>
             <ul>
                {character.comics && character.comics.items && character.comics.items.length > 0 ? (
                    character.comics.items.map((comic, index) => (
                        <li key={index}>{comic.name}</li>
                    ))
                ) : (
                    <li>None at the moment</li>
                )}
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    );
};