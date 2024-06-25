// Categories.js
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Categories() { 
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data); 
        });
    }

    async function saveCategory(ev) {
        ev.preventDefault();
        if (!name) {
            toast.error('Category name is required');
            return;
        }

        const data = { name, parent: parentCategory || null };
       
        try {
            if (editedCategory) {
                data._id = editedCategory._id;
                await axios.put('/api/categories', data);
                setEditedCategory(null); 
                setCategories(categories.map(cat => cat._id === editedCategory._id ? { ...cat, name: data.name, parent: categories.find(c => c._id === data.parent) } : cat));
                toast.success('Category updated successfully');
            } else {
                const result = await axios.post('/api/categories', data); 
                setCategories([...categories, { ...result.data, parent: categories.find(c => c._id === result.data.parent) }]);
                toast.success('Category created successfully');
            }
        } catch (error) {
            toast.error('An error occurred while saving the category');
        }
        setName(''); 
        setParentCategory('');
    }

    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id || '');
    }

    function confirmDeleteCategory(category) {
        confirmAlert({
            title: 'Confirm to delete',
            message: `Are you sure you want to delete ${category.name}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteCategory(category._id)
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }

    async function deleteCategory(categoryId) {
        try {
            await axios.delete(`/api/categories?_id=${categoryId}`);
            setCategories(categories.filter(cat => cat._id !== categoryId));
            toast.success('Category deleted successfully');
        } catch (error) {
            toast.error('An error occurred while deleting the category');
        }
    }

    return (
        <Layout>
            <ToastContainer />
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category ${editedCategory.name}` : 'Create New Category'}</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input
                    className="mb-0"
                    type="text"
                    placeholder={'Category name'}
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                />
                <select
                    className="mb-0"
                    onChange={ev => setParentCategory(ev.target.value)}
                    value={parentCategory}
                >
                    <option value="">No Parent Category</option>
                    {categories.length > 0 && categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn-primary py-1">Save</button>
            </form>
            <table className="basic mt-4 w-full">
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td>Parent Category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category.parent ? category.parent.name : 'No Parent'}</td>
                            <td>
                                <div className="flex gap-1">
                                    <button 
                                        onClick={() => editCategory(category)} 
                                        className="btn-primary mr-1"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => confirmDeleteCategory(category)} 
                                        className="btn-primary"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default Categories;
