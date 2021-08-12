import './styles.css'


export const Input = ({searchValue, onChange}) => (
    <div>
        {!!searchValue && (
            <h3>Search Value: {searchValue}</h3>
        )}
        <input
            className="text-input"
            onChange={onChange}
            value={searchValue}
            type="search"
            placeholder="Type your search!"
        />
    </div>
);
