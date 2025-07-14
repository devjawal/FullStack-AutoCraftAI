import { assets } from "../assets/assets"

const Testimonial = () => {
    const dummyTestimonialData = [
        {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: 'Arjun Verma',
    title: 'Marketing Strategist, CreativeOrbit',
    content: 'AutoCraft AI has streamlined our entire marketing workflow. From blog titles to visuals, it does the heavy lifting so my team can focus on strategy.',
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: 'Jacob Doe',
    title: 'Freelance Content Creator',
    content: 'As a solo creator, AutoCraft AI is like having a full content team. The article writer and image tools are shockingly accurate and creative.',
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    name: 'Ancy Simon',
    title: 'UX Writer, PixelTree',
    content: 'AutoCraft AI’s resume reviewer and content tools help me refine ideas fast. It’s become essential to my writing and editing workflow.',
    rating: 4,
  }
    ]

    return (
        <div className='bg-gradient-to-b from-neutral-900 to-black text-white'>
            <div className='px-4 sm:px-20 xl:px-32 py-24 relative z-10'>
                <div className='text-center'>
                    <h2 className='text-white text-[42px] font-semibold'><span className="text-[#00FFA3]">Loved</span> by Creators</h2>
                    <p className='text-gray-400 max-w-lg mx-auto'>Don't just take our word for it. Here's what our users are saying.</p>
                </div>
                <div className='flex flex-wrap mt-10 justify-center'>
                    {dummyTestimonialData.map((testimonial, index) => (
                        <div
                            key={index}
                            className='p-8 m-4 max-w-xs rounded-xl bg-neutral-800 hover:bg-neutral-700 shadow-md border border-neutral-700 hover:-translate-y-1 transition-all duration-300 cursor-pointer'
                        >
                            <div className="flex items-center gap-1">
                                {Array(5).fill(0).map((_, index) => (
                                    <img
                                        key={index}
                                        src={index < testimonial.rating ? assets.star_icon : assets.star_dull_icon}
                                        className={`w-4 h-4`}
                                        alt="star"
                                    />
                                ))}
                            </div>
                            <p className='text-gray-300 text-sm my-5'>"{testimonial.content}"</p>
                            <hr className='mb-5 border-gray-700' />
                            <div className='flex items-center gap-4'>
                                <img src={testimonial.image} className='w-12 object-contain rounded-full' alt='' />
                                <div className='text-sm text-gray-300'>
                                    <h3 className='font-medium text-white'>{testimonial.name}</h3>
                                    <p className='text-xs text-gray-400'>{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Testimonial
