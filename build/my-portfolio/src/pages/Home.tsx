import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
            <p className="mt-4 text-lg">This is the place where I showcase my work and projects.</p>
            <div className="mt-8">
                <h2 className="text-2xl">About Me</h2>
                <p className="mt-2">I am a passionate developer with experience in building web applications.</p>
            </div>
        </div>
    );
};

export default Home;