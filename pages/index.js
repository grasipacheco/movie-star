import MovieCard from '@/components/MovieCard';
import useSWR from 'swr';
import styled from 'styled-components';
import SearchForm from '@/components/SearchForm';
import {useState} from 'react';
import Link from 'next/link';

const fetcher = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
};

const H1 = styled.h1`
    text-align: center;
    margin-bottom: 1.2rem;
`;

const Ul = styled.ul`
    list-style: none;
`;

const Li = styled.li`
    margin-bottom: 1.6rem;
`;
const H2 = styled.h2`
    margin-bottom: 1.6rem;
`;

export default function HomePage() {
    const [query, setQuery] = useState('');

    const {data: movies, isLoading} = useSWR(
        `/api/movies?search=${query || 'Jack+Reacher'}`,

        fetcher,
    );

    function handleQueryName(data) {
        setQuery(data);
    }

    return (
        <div>
            <H1>MovieStar</H1>
            <SearchForm onSubmit={handleQueryName} />
            {query ? <H2>Search Results: {query}</H2> : <H2>Movies</H2>}
            <Ul>
                {movies?.results?.map((movie) => (
                    <Li key={movie.id}>
                        <Link href={'./movies/' + movie.id} key={movie.id}>
                            <MovieCard
                                title={movie.title}
                                release={movie.release_date}
                                image={movie.poster_path}
                            />
                        </Link>
                    </Li>
                ))}
            </Ul>
        </div>
    );
}