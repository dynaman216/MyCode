import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MyMenu() {
    const [showFileDropdown, setShowFileDropdown] = useState(false);
    const [showMenu2Dropdown, setShowMenu2Dropdown] = useState(false);

    const dispatch = useDispatch();
    const count = useSelector(state => state.counter.count);
    const text = useSelector(state => state.string.text);

    const updateLastSelected = () => {
        console.log('Updating increment values:');
        dispatch({ type: 'INCREMENT' });
    }

    const handleMenuClick = (itemName) => {
        setShowFileDropdown(false);
        setShowMenu2Dropdown(false);
        var newCount = count;
        switch (itemName) {
            case 'New':
                newCount = newCount + 1;
                break;
            case 'Item1':
                newCount = newCount - 1;
                break;
            case 'Item2':
                newCount = newCount - 10;
                break;
            default:
                newCount = newCount + 10;
        }

        //dispatch({ type: 'INCREMENT' });
        dispatch({ type: 'SET_COUNT', payload: newCount });
        alert(`You clicked: ${itemName} and count is ${newCount}`);
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                margin: 0,
                padding: 0,
                backgroundColor: '#edf1f1ff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '2px solid red',
            }}
        >
            {/* Top Menu */}
            <nav
                style={{
                    width: '100%',
                    backgroundColor: '#333',
                    color: 'white',
                    display: 'flex',
                    gap: '20px',
                    padding: '10px 20px',
                    position: 'relative',
                }}
            >
                {/* File Menu */}
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <span onClick={() => setShowFileDropdown(!showFileDropdown)}>File ▾</span>
                    {showFileDropdown && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                backgroundColor: '#444',
                                padding: '10px',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                                zIndex: 1,
                            }}
                        >
                            {['New', 'Save', 'Exit'].map((item) => (
                                <div
                                    key={item}
                                    style={{ padding: '5px 10px', cursor: 'pointer' }}
                                    onClick={() => handleMenuClick(item)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Menu2 */}
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <span onClick={() => setShowMenu2Dropdown(!showMenu2Dropdown)}>Menu2 ▾</span>
                    {showMenu2Dropdown && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                backgroundColor: '#444',
                                padding: '10px',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                                zIndex: 1,
                            }}
                        >
                            {['Item1', 'Item2'].map((item) => (
                                <div
                                    key={item}
                                    style={{ padding: '5px 10px', cursor: 'pointer' }}
                                    onClick={() => handleMenuClick(item)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default MyMenu