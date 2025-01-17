import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { useState, useEffect } from 'react';
import { type FilterState } from './filterTypes';
import { type Product } from '../../services/apiProducts';
import { getBrandOptions, getCategoryOptions } from './filterUtils';

interface FilterSectionProps {
  filterState: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  products: Product[];
}

function FilterSection({
  filterState,
  onApplyFilters,
  products,
}: FilterSectionProps) {
  const [inputFilters, setInputFilters] = useState<FilterState>(filterState);

  useEffect(() => {
    setInputFilters(filterState);
  }, [filterState]);

  const handleInputChange = (key: keyof FilterState, value: unknown) => {
    setInputFilters((prev) => {
      let newFilters = { ...prev, [key]: value };

      // Reset brand/category if the other changes
      if (key === 'category' && value !== prev.category) {
        newFilters = { ...newFilters, brand: 'all-brand' }; // Reset brand
      }
      if (key === 'brand' && value !== prev.brand) {
        newFilters = { ...newFilters, category: 'all-category' }; // Reset category
      }

      return newFilters;
    });
  };

  const handlePriceChange = (value: [number, number]) => {
    const [newMin, newMax] = value;
    const currentMin = inputFilters.priceRange[0];
    const currentMax = inputFilters.priceRange[1];

    let adjustedMin = newMin;
    let adjustedMax = newMax;

    // Ensure minimum price is at least $50 less than maximum
    if (newMin > newMax - 50) {
      adjustedMin = newMax - 50;
    }

    // Ensure maximum price is at least $50 more than minimum
    if (newMax < newMin + 50) {
      adjustedMax = newMin + 50;
    }

    // If min changed, adjust max if necessary
    if (newMin !== currentMin && adjustedMax !== currentMax) {
      adjustedMax = Math.min(40000, Math.max(adjustedMin + 50, currentMax));
    }

    // If max changed, adjust min if necessary
    if (newMax !== currentMax && adjustedMin !== currentMin) {
      adjustedMin = Math.max(0, Math.min(adjustedMax - 50, currentMin));
    }

    setInputFilters((prev) => ({
      ...prev,
      priceRange: [adjustedMin, adjustedMax],
    }));
  };

  const categoryOptions = getCategoryOptions(products);
  const brandOptions = getBrandOptions(products);

  return (
    <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:gap-10">
      <Dropdown
        value={inputFilters.category}
        options={categoryOptions}
        onChange={(e: DropdownChangeEvent) =>
          handleInputChange('category', e.value)
        }
        className="w-52 rounded-md border border-gray-400 p-2 shadow-sm transition duration-150 ease-in-out focus:border-primary focus:ring focus:ring-primary"
        placeholder="Select a Category"
      />

      <Dropdown
        value={inputFilters.brand}
        options={brandOptions}
        onChange={(e: DropdownChangeEvent) =>
          handleInputChange('brand', e.value)
        }
        className="w-48 rounded-md border border-gray-400 p-2 shadow-sm transition duration-150 ease-in-out focus:border-primary focus:ring focus:ring-primary"
        placeholder="Select a Brand"
      />

      <div className="flex items-center gap-2">
        <span className="font-medium text-text">In Stock</span>
        <InputSwitch
          checked={inputFilters.inStock}
          onChange={(e) => handleInputChange('inStock', e.value)}
          className="custom-inputswitch"
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-lg font-semibold text-text">
          Price Range: ${inputFilters.priceRange[0]} - $
          {inputFilters.priceRange[1]}
        </span>

        <Slider
          value={inputFilters.priceRange}
          onChange={(e: SliderChangeEvent) =>
            handlePriceChange(e.value as [number, number])
          }
          className="custom-slider w-64"
          range
          min={0}
          max={40000}
          step={1}
        />
      </div>

      <button
        onClick={() => onApplyFilters(inputFilters)}
        className="hover:bg-secondary-dark mt-4 rounded-lg bg-secondary px-6 py-3 text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default FilterSection;
