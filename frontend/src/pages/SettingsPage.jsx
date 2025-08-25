import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useQuery, useMutation } from '@tanstack/react-query'
import { deleteUser } from '../lib/api'
import { Link } from 'react-router'

const SettingsPage = () => {
    const authUser = useAuthUser()
    const [language, setLanguage] = useState(authUser?.learningLanguage || 'english')

    const { mutate: deleteAccount, isPending } = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            alert('Account deleted!');
            window.location.href = '/login'; 
        },
        onError: () => {
            alert('Failed to delete account.');
        }
    });

    const handleLanguageChange = (e) => setLanguage(e.target.value)

    return (
        <div className="min-h-screen bg-base-200 flex justify-center items-center py-8">
            <div className="bg-base-100 rounded-2xl shadow-xl p-8 w-full max-w-xl">
                <h2 className="text-2xl font-bold text-primary mb-6">Settings</h2>

                {/* Select Language */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-base-content">Select Language</label>
                    <select
                        className="input input-bordered w-full"
                        value={language}
                        onChange={handleLanguageChange}
                    >
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="punjabi">Punjabi</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Russian">Russian</option>

                    </select>
                </div>

                {/* Invite a Friend */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-base-content">Invite a Friend</label>
                    <button
                        className="btn btn-primary w-full"
                        onClick={() => window.navigator.share
                            ? window.navigator.share({ title: 'Join Vibely!', url: window.location.origin })
                            : alert('Copy and share this link: ' + window.location.origin)
                        }
                    >
                        Send Invite
                    </button>
                </div>

                {/* About the Website */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-base-content">About the Devloper</label>
                    <Link to="/about">
                    <button className='btn w-full btn-primary rounded-xl'>Visit The Devloper</button>
                    </Link>
                </div>

                {/* Edit Account */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-base-content">Edit Account</label>
                    <button className="btn btn-outline w-full" onClick={() => window.location.href = '/profile'}>
                        Edit Profile
                    </button>
                </div>

                {/* Delete Account */}
                <div>
                    <label className="block font-semibold mb-2 text-error">Delete Account</label>
                    <button
                        className="btn btn-error w-full"
                        disabled={isPending}
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                                deleteAccount();
                            }
                        }}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage