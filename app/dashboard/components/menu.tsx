"use client";
import {
  Box,
  Button,
  Checkbox,
  Link,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Product, ProductResponse } from "../types";

function Menu({
  setColumnChartData,
  loading,
  setLoading,
}: {
  setColumnChartData: Dispatch<SetStateAction<Product[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isRunDisabled, setIsRunDisabled] = useState(false);
  const selectedFilter = useRef<Product[]>([]);

  function clearFilters() {
    selectedFilter.current = [];
    setProduct([]);
    setCategory("");
    setColumnChartData([]);
  }

  const getCategories = useCallback(async () => {
    const res = await fetch("https://dummyjson.com/products/category-list");
    const responseData: string[] = await res.json();
    setCategories(responseData);
  }, []);

  async function fetchProductForCategory(selectedCategory: string) {
    const res = await fetch(
      "https://dummyjson.com/products/category/" + selectedCategory
    );
    const responseData: ProductResponse = await res.json();
    setProducts(responseData.products);
  }

  const handleProductChange = (event: SelectChangeEvent<typeof product>) => {
    const {
      target: { value },
    } = event;
    setProduct(typeof value === "string" ? value.split(",") : value);
    setIsRunDisabled(false);
  };

  const handleCategoryChange = (event: SelectChangeEvent<typeof category>) => {
    selectedFilter.current = [];
    setColumnChartData([]);
    fetchProductForCategory(event.target.value);
    setProduct([]);
    setCategory(event.target.value);
    setIsRunDisabled(false);
  };
  const onRunReport = async () => {
    setLoading(true);
    await sleep(3000);
    setLoading(false);
    setIsRunDisabled(true);
    selectedFilter.current =
      product.length > 0
        ? products.filter((productDetail) =>
            product.includes(productDetail.title)
          )
        : products;
    setColumnChartData(selectedFilter.current);
  };

  const areArraysIdentical = useCallback(
    (arr1: string[], arr2: string[]): boolean => {
      // If all products are chosen
      if (arr2.length === 0 && arr1.length === products.length) {
        return true;
      }
      if (arr1.length !== arr2.length) {
        return false;
      }
      if (arr1.length === 0 || arr2.length === 0) {
        return false;
      }
      let returValue = true;
      arr1.forEach((item) => {
        if (!arr2.includes(item)) {
          returValue = false;
        }
      });
      return returValue;
    },
    [products.length]
  );

  const isButtonDisabled = useMemo(() => {
    const selectedProducts = selectedFilter.current.map(
      (filter) => filter.title
    );
    return (
      !category ||
      isRunDisabled ||
      loading ||
      areArraysIdentical(selectedProducts, product)
    );
  }, [areArraysIdentical, category, isRunDisabled, loading, product]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      border={"1px solid"}
      p={5}
      minWidth={300}
      height={"100%"}
      justifyContent={"space-between"}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography className="text-3xl">Filters</Typography>
          <Button
            style={{ textTransform: "none", color: "black" }}
            onClick={clearFilters}
          >
            Clear
          </Button>
        </Box>
        <Select
          variant="outlined"
          value={category}
          onChange={handleCategoryChange}
          className="my-5"
          displayEmpty
        >
          <MenuItem hidden value="">
            Select Category
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {`${category.charAt(0).toUpperCase()}${category.substring(1)}`}
            </MenuItem>
          ))}
        </Select>
        <Select
          variant="outlined"
          multiple
          displayEmpty
          value={product}
          onChange={handleProductChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return "Select Product";
            }

            return selected.join(", ");
          }}
          disabled={!category}
          style={{ maxWidth: 300 }}
        >
          <MenuItem disabled value="">
            Select Product
          </MenuItem>
          {products.map((productItem) => (
            <MenuItem key={productItem.id} value={productItem.title}>
              <Checkbox checked={product.indexOf(productItem.title) > -1} />
              <ListItemText primary={productItem.title} />
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Button
        variant="contained"
        disableElevation
        disabled={isButtonDisabled}
        onClick={onRunReport}
      >
        Run Report
      </Button>
    </Box>
  );
}

export default Menu;
