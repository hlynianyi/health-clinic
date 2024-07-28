import React, { useEffect, useState } from "react";

const DoctorCategories = ({ doctors, onSelectCategory }) => {
  const [categories, setCategories] = useState({});
  const [letters, setLetters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const categoryMap = {};
    doctors.forEach((doctor) => {
      doctor.specialty.split(", ").forEach((spec) => {
        const firstLetter = spec.trim().charAt(0).toUpperCase();
        if (!categoryMap[firstLetter]) {
          categoryMap[firstLetter] = new Set();
        }
        categoryMap[firstLetter].add(spec.trim().toLowerCase());
      });
    });

    const sortedLetters = Object.keys(categoryMap).sort();
    const sortedCategories = {};

    sortedLetters.forEach((letter) => {
      sortedCategories[letter] = Array.from(categoryMap[letter]).sort();
    });

    setLetters(sortedLetters);
    setCategories(sortedCategories);
  }, [doctors]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const handleShowAllDoctors = () => {
    setSelectedCategory(null);
    onSelectCategory(null);
  };

  return (
    <>
      <section className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-2 bg-bggray rounded-lg p-4 mb-1 mt-2">
        {letters.map((letter) => (
          <div key={letter} className="mb-3 flex flex-row gap-3">
            <div className="text-maingreen font-bold text-lg pt-[1.5px]">
              {letter}
            </div>
            <div className="flex gap-1 flex-col">
              {categories[letter].map((category, index) => (
                <button
                  className={`text-[14px] p-1 pl-2 w-[250px] flex flex-start rounded ${
                    selectedCategory === category
                      ? "bg-maingreen text-white"
                      : "hover:bg-maingreen hover:text-white"
                  }`}
                  key={index}
                  onClick={() => handleSelectCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {selectedCategory && (
        <div className="flex justify-center mt-2 mb-0 w-full tablet:w-[50%] laptop:w-[35%] desktop:w-[30%] m-auto">
          <button
            className="w-full bg-maingreen text-white p-2 rounded text-xs tablet:text-[15px] hover:bg-mainblue hover:scale-[95%] laptop:hover:scale-[105%]"
            onClick={handleShowAllDoctors}
          >
            ПОКАЗАТЬ ВСЕХ ВРАЧЕЙ
          </button>
        </div>
      )}
    </>
  );
};

export default DoctorCategories;
