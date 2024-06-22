"use client";
import Menu from "./components/menu";
import Piechart from "./components/piechart";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { Category, PiechartData, Product } from "./types";
import { CircularProgress } from "@mui/material";
import Barchart from "./components/barchart";

export default function Home() {
  const [piechartData, setPiechartData] = useState<PiechartData[]>([]);
  const [columnChartData, setColumnChartData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = useCallback(async () => {
    setLoading(true);
    const res = await fetch("https://dummyjson.com/products/categories");
    const categories: Category[] = await res.json();
    setLoading(false);
    const formattedData: PiechartData[] = [];
    categories.forEach((category) => {
      formattedData.push({ name: category.name, y: 1 });
    });
    setPiechartData(formattedData);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div className="w-screen h-screen flex items-center p-8 justify-between bg-white">
      <Menu
        setColumnChartData={setColumnChartData}
        loading={loading}
        setLoading={setLoading}
      />
      <div className="w-full p-5 flex items-center justify-center">
        {loading ? (
          <CircularProgress />
        ) : columnChartData.length > 0 ? (
          <Barchart products={columnChartData} />
        ) : (
          <Piechart piechartData={piechartData} />
        )}
      </div>
    </div>
  );
}
