//Tristan Schwekendiek 2024
"use client";

//imports from react
import { useState, useRef, useEffect } from 'react';

//faq array - I chose this theme for the faq as a way answer some questions about myself as a potential job candidate
const faqData = [
  { question: 'Who is Tristan Schwekendiek?', 
    answer: 'Tristan Schwekendiek is a hard-working 22 year old computer science student who is currently enrolled in computer science at Georgian College and Lakehead University.' },
  { question: 'What skills does he possess?', 
    answer: 'Tristan has a passion for web design and development and that shows in all facits of his work.  He has a keen eye for details, a strong work ethic and an ability to pick up new skills quickly.  He is a creative all arounder who would be a vital asset of useHireUp.' },
  { question: 'How did he make this webpage?', 
    answer: 'His goal was to create a modern faq page using highly saturated colors and elements of modern website design such as transitions, glassy looking dropdown menus and a clean bold layout that maintains its visual appeal regardless of the viewing device.  No templates were used in this pages creation.  While he usually prefers doing his CSS manually in a seperate file, Tristan leveraged his prior knowledge of TailwindCSS and general web design tools to design the eye-catching and polished frequently asked questions page you are currently looking at.  He also had a fun time learning the intricacies of next.js, especially when it came to adding search features.' },
  { question: 'What did he use for the background?', 
    answer: 'He used https://app.haikei.app/ to generate the SVG wave pattern used as the background of the site.' },
  { question: 'Has he worked doing web development before?', 
    answer: 'In the past, Tristan worked as part of a 4 man web development team which made a code forum for their college.  Students could use this forum to help each other troubleshoot specific issues related to their classes.  He was the front-end designer and designed the vast majority of the website by hand using CSS.  He also did a lot of the backend coding as well.  You can visit the forum at https://georgiancodeforum.com (it might take a while to load because of the free hosting server that it is hosted on).' },
  { question: 'What is Tristan like a person?', 
    answer: 'Tristan is a bright, outgoing person who always tries his best no matter the task.  He works tirelessly to avoid cutting corners and will sink hours into small details to ensure perfection.  His hobbies incude music production, Dungeons & Dragons and reading and collecting Manga.  He hopes that does not make him sound like too big of a nerd.' },
];

//
export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expandAll, setExpandAll] = useState(false);
  const refs = useRef([]);


  useEffect(() => {
    //Sets the background colour of the entire page to make the SVG look nicer on smaller viewports
    document.body.style.backgroundColor = '#000932';

    //Cleanup function that resets the background colour when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    //Checks if the search query is in the URL
    const searchParams = new URLSearchParams(window.location.search);
    const initialSearchTerm = searchParams.get('search');
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
  }, []);

  useEffect(() => {
    //Updates the URL when the searchbar is changed
    if (searchTerm) {
      const url = new URL(window.location);
      url.searchParams.set('search', searchTerm);
      window.history.pushState({}, '', url);
    } else {
      const url = new URL(window.location);
      url.searchParams.delete('search');
      window.history.pushState({}, '', url);
    }
  }, [searchTerm]);

  const filteredFaqs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Handles the toggle system for when the questions are expanded
  const handleToggle = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  //I implemented the expand button as a toggle
  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
    setExpandedIndex(expandAll ? null : 0);
  };

  //Main HTML section
  return (
    <div className="m-4 md:m-10 lg:m-20 mt-10 lg:mt-20">
      {/* SVG Background */}
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 960 540"
          width="100%"
          height="auto"
          version="1.1"
          className="fixed top-0 left-0 w-full h-auto z-[-1]"
        >
          <path d="M0 147L14.5 143.3C29 139.7 58 132.3 87.2 128.7C116.3 125 145.7 125 174.8 126C204 127 233 129 262 129C291 129 320 127 349 122.5C378 118 407 111 436.2 120C465.3 129 494.7 154 523.8 161.2C553 168.3 582 157.7 611 154.2C640 150.7 669 154.3 698 158.8C727 163.3 756 168.7 785.2 162.3C814.3 156 843.7 138 872.8 139.8C902 141.7 931 163.3 945.5 174.2L960 185L960 0L945.5 0C931 0 902 0 872.8 0C843.7 0 814.3 0 785.2 0C756 0 727 0 698 0C669 0 640 0 611 0C582 0 553 0 523.8 0C494.7 0 465.3 0 436.2 0C407 0 378 0 349 0C320 0 291 0 262 0C233 0 204 0 174.8 0C145.7 0 116.3 0 87.2 0C58 0 29 0 14.5 0L0 0Z" fill="#1f00ff"/>
          <path d="M0 255L14.5 254C29 253 58 251 87.2 243.8C116.3 236.7 145.7 224.3 174.8 214.5C204 204.7 233 197.3 262 200.8C291 204.3 320 218.7 349 213.3C378 208 407 183 436.2 196.5C465.3 210 494.7 262 523.8 284.5C553 307 582 300 611 293.7C640 287.3 669 281.7 698 279.8C727 278 756 280 785.2 265.7C814.3 251.3 843.7 220.7 872.8 215.2C902 209.7 931 229.3 945.5 239.2L960 249L960 183L945.5 172.2C931 161.3 902 139.7 872.8 137.8C843.7 136 814.3 154 785.2 160.3C756 166.7 727 161.3 698 156.8C669 152.3 640 148.7 611 152.2C582 155.7 553 166.3 523.8 159.2C494.7 152 465.3 127 436.2 118C407 109 378 116 349 120.5C320 125 291 127 262 127C233 127 204 125 174.8 124C145.7 123 116.3 123 87.2 126.7C58 130.3 29 137.7 14.5 141.3L0 145Z" fill="#001acb"/>
          <path d="M0 330L14.5 329.2C29 328.3 58 326.7 87.2 318.7C116.3 310.7 145.7 296.3 174.8 280.2C204 264 233 246 262 247.8C291 249.7 320 271.3 349 274.8C378 278.3 407 263.7 436.2 276.2C465.3 288.7 494.7 328.3 523.8 344.7C553 361 582 354 611 344.2C640 334.3 669 321.7 698 324.3C727 327 756 345 785.2 339.5C814.3 334 843.7 305 872.8 292.3C902 279.7 931 283.3 945.5 285.2L960 287L960 247L945.5 237.2C931 227.3 902 207.7 872.8 213.2C843.7 218.7 814.3 249.3 785.2 263.7C756 278 727 276 698 277.8C669 279.7 640 285.3 611 291.7C582 298 553 305 523.8 282.5C494.7 260 465.3 208 436.2 194.5C407 181 378 206 349 211.3C320 216.7 291 202.3 262 198.8C233 195.3 204 202.7 174.8 212.5C145.7 222.3 116.3 234.7 87.2 241.8C58 249 29 251 14.5 252L0 253Z" fill="#001d97"/>
          <path d="M0 401L14.5 399.2C29 397.3 58 393.7 87.2 382.8C116.3 372 145.7 354 174.8 346.8C204 339.7 233 343.3 262 343.3C291 343.3 320 339.7 349 340.5C378 341.3 407 346.7 436.2 359.2C465.3 371.7 494.7 391.3 523.8 398.5C553 405.7 582 400.3 611 403.2C640 406 669 417 698 426C727 435 756 442 785.2 427.5C814.3 413 843.7 377 872.8 358.2C902 339.3 931 337.7 945.5 336.8L960 336L960 285L945.5 283.2C931 281.3 902 277.7 872.8 290.3C843.7 303 814.3 332 785.2 337.5C756 343 727 325 698 322.3C669 319.7 640 332.3 611 342.2C582 352 553 359 523.8 342.7C494.7 326.3 465.3 286.7 436.2 274.2C407 261.7 378 276.3 349 272.8C320 269.3 291 247.7 262 245.8C233 244 204 262 174.8 278.2C145.7 294.3 116.3 308.7 87.2 316.7C58 324.7 29 326.3 14.5 327.2L0 328Z" fill="#001864"/>
          <path d="M0 541L14.5 541C29 541 58 541 87.2 541C116.3 541 145.7 541 174.8 541C204 541 233 541 262 541C291 541 320 541 349 541C378 541 407 541 436.2 541C465.3 541 494.7 541 523.8 541C553 541 582 541 611 541C640 541 669 541 698 541C727 541 756 541 785.2 541C814.3 541 843.7 541 872.8 541C902 541 931 541 945.5 541L960 541L960 334L945.5 334.8C931 335.7 902 337.3 872.8 356.2C843.7 375 814.3 411 785.2 425.5C756 440 727 433 698 424C669 415 640 404 611 401.2C582 398.3 553 403.7 523.8 396.5C494.7 389.3 465.3 369.7 436.2 357.2C407 344.7 378 339.3 349 338.5C320 337.7 291 341.3 262 341.3C233 341.3 204 337.7 174.8 344.8C145.7 352 116.3 370 87.2 380.8C58 391.7 29 395.3 14.5 397.2L0 399Z" fill="#000932"/>
        </svg>
        
        <div className="relative z-10 p-4">
          <h1 className="text-4xl font-bold mb-4 text-white text-center">Frequently Asked Questions</h1>
          <h2 className="text-xl font-bold mb-4 text-white text-center">Learn more about the creator of this FAQ page and how he would be an amazing addition to your company.</h2>
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full p-2 mb-4 border rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-gray-200 p-4 text-white rounded-full mr-2"
          onClick={toggleExpandAll}
        >
          {expandAll ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg border border-gray-200 p-4 text-white transition-all duration-300 ease-in-out"
            style={{
              maxHeight: expandedIndex === index || expandAll ? '100%' : '5rem',
            }}
          >
            <button
              className="w-full flex justify-between items-center py-2 text-lg font-medium focus:outline-none"
              onClick={() => handleToggle(index)}
            >
              {faq.question}
              <span
                className={`transform transition-transform duration-300 ${
                  expandedIndex === index || expandAll ? 'rotate-180' : ''
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v10a1 1 0 01-2 0V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <div
              ref={(el) => (refs.current[index] = el)}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedIndex === index || expandAll ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="mt-4 text-gray-300">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <footer className="text-white py-4 mt-10 pt-10">
              <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  &copy; Tristan Schwekendiek 2024
                </div>
                <div className="flex space-x-6">
                  <a
                    href="https://github.com/TristanSchwekendiek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.112.82-.262.82-.583 0-.287-.01-1.043-.015-2.048-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.204.086 1.837 1.235 1.837 1.235 1.07 1.832 2.807 1.303 3.492.997.107-.775.42-1.303.762-1.603-2.665-.304-5.466-1.334-5.466-5.933 0-1.31.467-2.382 1.235-3.222-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.006-.404 1.02.005 2.048.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.874.12 3.176.77.84 1.232 1.912 1.232 3.222 0 4.61-2.804 5.626-5.475 5.922.43.372.823 1.103.823 2.222 0 1.605-.015 2.897-.015 3.293 0 .324.217.699.825.58C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tristan-schwekendiek-bab1171b6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.636 19h-2.727v-8.636h2.727v8.636zm-1.364-9.773c-.873 0-1.364-.727-1.364-1.364 0-.845.509-1.364 1.364-1.364s1.364.519 1.364 1.364c0 .636-.491 1.364-1.364 1.364zm13.091 9.773h-2.727v-4.364c0-1.527-.964-1.964-1.455-1.964-.855 0-1.527.491-1.527 1.364v4.955h-2.727v-8.636h2.727v1.091h.036c.309-.582 1.018-1.091 1.982-1.091 1.545 0 3 1.036 3 3.545v5.091z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:tristanschwekendiek@gmail.com"
                    className="hover:text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12.713l11.985-8.713h-23.97l11.985 8.713zm-12-9.713v18h24v-18h-24zm22 2.245v13.755h-20v-13.755l10 7.288 10-7.288z" />
                    </svg>
                  </a>
                </div>
              </div>
            </footer>
    </div>
  );
}