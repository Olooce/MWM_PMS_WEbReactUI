import React, { useState, useEffect, useCallback } from 'react';
import { get } from '../api';
import Dash from "../layout/Dash";
import LoadingAnimation from './LoadingAnimation';
import ExportsTable from './ExportsTable';
import Pagination from '../components/Pagination';

export default function{
    const [exports, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [inputPage, setInputPage] = useState(1);
    const [inputSize, setInputSize] = useState(10);

    const fetchExports = useCallback(() => {});
}