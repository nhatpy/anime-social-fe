import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../hooks";
import { categoryApi } from "../../apis";
import { ICategory } from "../../interfaces";
import { icons } from "../../utils/icons";

export const CustomNavbar = () => {
  const { callApi: callCategoryApis } = useApi<void>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      await callCategoryApis(async () => {
        const { data } = await categoryApi.getAll();
        if (data) {
          setCategories(data.data);
        }
      });
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setHoveredCategoryId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems1 = [
    { label: "HOME", to: "/", icon: icons.home },
    { label: "HOT", to: "/search?sortBy=view" },
    { label: "THEO DÕI", to: "/follow" },
    { label: "TÌM TRUYỆN", to: "/search" },
  ];
  const menuItems2 = [
    { label: "ANIME", to: "/search?categorySlug=anime" },
    { label: "MANHUA", to: "/search?categorySlug=manhua" },
    { label: "MANHWA", to: "/search?categorySlug=manhwa" },
  ];

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="container mx-auto flex items-center space-x-6 py-3 px-4 justify-center">
        {menuItems1.map((item) => (
          <Link
            to={item.to}
            key={item.label}
            className="uppercase text-sm flex items-center"
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </Link>
        ))}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="uppercase text-sm flex items-center"
          >
            THỂ LOẠI{" "}
            <span className="pl-2">
              {!isDropdownOpen ? icons.down : icons.up}
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-50 w-[700px] bg-white border rounded shadow-lg mt-[6px]">
              <div className="grid grid-cols-4 gap-4 max-h-[300px] overflow-y-auto p-4 border-b">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="relative"
                    onMouseEnter={() => setHoveredCategoryId(category.id)}
                    onMouseLeave={() => setHoveredCategoryId(null)}
                  >
                    <Link
                      to={`/search?categorySlug=${category.slug}`}
                      className="text-base text-gray-700 transition"
                    >
                      {category.name.charAt(0).toUpperCase() +
                        category.name.slice(1)}
                    </Link>
                  </div>
                ))}
              </div>

              {hoveredCategoryId && (
                <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-b">
                  {categories.find((c) => c.id === hoveredCategoryId)
                    ?.description || "Không có mô tả"}
                </div>
              )}
            </div>
          )}
        </div>
        {menuItems2.map((item) => (
          <Link
            to={item.to}
            key={item.label}
            className="uppercase text-sm flex items-center"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
