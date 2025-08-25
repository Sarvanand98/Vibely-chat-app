import React from 'react'
import useAuthUser from '../hooks/useAuthUser'

const ProfilePage = () => {
  const { authUser, isLoading } = useAuthUser()

  if (isLoading || !authUser) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center py-7">
      <div className="bg-base-100 rounded-2xl shadow-xl p-8 w-full max-w-xl">
        <div className="flex flex-col items-center gap-3 mb-6">
          <img
            src={authUser.profilePic}
            alt={authUser.fullName}
            className="w-24 h-24 rounded-full border-4 border-primary shadow"
          />
          <h2 className="text-2xl font-bold text-primary">{authUser.fullName}</h2>
          <span className="text-base-content">{authUser.email}</span>
        </div>
        <div className="mb-4">
          <span className="block text-base-content font-semibold mb-1">Bio:</span>
          <span className="block bg-base-200 rounded-lg p-2">{authUser.bio || "No bio yet."}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-xs text-base-content">Location</span>
            <div className="font-semibold">{authUser.location}</div>
          </div>
          <div>
            <span className="text-xs text-base-content">Learning Language</span>
            <div className="font-semibold">{authUser.learningLanguage}</div>
          </div>
          <div>
            <span className="text-xs text-base-content">Native Language</span>
            <div className="font-semibold">{authUser.nativeLanguage}</div>
          </div>
          <div>
            <span className="text-xs text-base-content">Joined</span>
            <div className="font-semibold">{new Date(authUser.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="mb-4">
          <span className="block text-base-content font-semibold mb-2">Payment Methods:</span>
          <div className="flex flex-col gap-2">
            {authUser.paymentMethods?.map((pm, idx) => (
              <div key={idx} className="bg-base-200 rounded-lg px-3 py-2 flex flex-col">
                <span className="font-semibold text-primary capitalize">{pm.type}</span>
                <span className="text-xs text-base-content">{pm.label}</span>
                <span className="text-sm break-all text-base-content">{typeof pm.details === 'string' ? pm.details : JSON.stringify(pm.details)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage