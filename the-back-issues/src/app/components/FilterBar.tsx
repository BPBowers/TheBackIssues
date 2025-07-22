'use client'
import React from 'react'

interface FilterBarProps {
    seriesTitles: string[]
    selectedSeries: string | null
    onSelectSeries: (series: string | null) => void
}

const FilterBar: React.FC<FilterBarProps> = ({seriesTitles, selectedSeries, onSelectSeries}) => {
    return (
        <details className="dropdown">
            <summary className="btn m-1">{selectedSeries ?? 'Filter by Series'}</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>
                        <button onClick={() => onSelectSeries(null)}>
                            All Series
                        </button>
                    </li>
                    {seriesTitles.map((title, index) => (
                        <li key={index}>
                            <button onClick={() => onSelectSeries(title)}>
                                {title}    
                            </button>    
                        </li>
                    ))}
            </ul>
        </details>
    )
}

export default FilterBar