import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Badge } from './ui/badge';
import Footer from './shared/Footer';
import Navbar from './shared/Navbar';
import { Search } from 'lucide-react';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchedQuery } from '@/redux/jobSlice';

// HeroSection Component
const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <h1 className='text-5xl font-bold'>
          Find Your <span className='text-[dodgerblue]'>Dream Jobs</span>
        </h1>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input
            type="text"
            placeholder='Find your dream jobs'
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full'
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[dodgerblue]">
            <Search className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  );
};

// CategoryCarousel Component
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
              <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

// LatestJobs Component
const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className='max-w-6xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'>
        <span className='text-[dodgerblue]'>Latest </span> Job Openings
      </h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};


// LatestJobCards Component
const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
      </div>
    </div>
  );
};

// Home Component
const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'Employer') {
      navigate("/admin/companies");
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;