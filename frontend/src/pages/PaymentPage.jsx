import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { getpaymentsData, sendpaymentData } from '../lib/api'
import PaymentCard from '../components/PaymentCard'

const PaymentPage = () => {
    const queryClient = useQueryClient()
    const authUser = useAuthUser();
    const [showDrawer, setShowDrawer] = useState(false);
    const [label, setLabel] = useState('');
    const [type, setType] = useState('');
    const [details, setDetails] = useState('');

    const { data: showpaymentData, isLoading } = useQuery({
        queryKey: ["payments"],
        queryFn: getpaymentsData,
        enabled: !!authUser
    })
    const { mutate: paymentData, isPending } = useMutation({
        mutationFn: sendpaymentData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payments"] });
            setShowDrawer(false);
            setLabel('');
            setType('');
            setDetails('');
        }
    })
    const handlesubmit = (e) => {
        e.preventDefault()
        paymentData({ label, type, details })
    }
    console.log(showpaymentData, "data payments");


    return (
        <div className='min-h-screen bg-base-200  sm:p-6 lg:p-8'>
            <div className='container mx-auto space-y-10'>
                <div className='flex items-center justify-center gap-4'>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Payments</h2>
                </div>
                <section>
                    {
                        isPending ? (
                            <div className="flex justify-center py-12">
                                <span className="loading loading-spinner loading-lg" />
                            </div>
                        ) : (
                            <div className='w-full space-y-3 flex items-center justify-end '>
                                <button
                                    className='btn bg-base-200 btn-primary btn-outline'
                                    onClick={() => setShowDrawer(true)}
                                >
                                    Add Payments
                                </button>
                            </div>
                        )
                    }
                    {/* Drawer */}
                    <div
                        className={`fixed top-0 right-0 h-full w-full max-w-md bg-base-100 shadow-2xl z-50 transition-transform duration-300 ${showDrawer ? 'translate-x-0' : 'translate-x-full'
                            } rounded-l-2xl border-l border-base-300`}
                        style={{ boxShadow: "0 0 32px 0 rgba(0,0,0,0.18)" }}
                    >
                        <div className="p-6 flex justify-between items-center border-b">
                            <h3 className="font-bold text-lg">Add Payment</h3>
                            <button className="btn btn-sm btn-ghost" onClick={() => setShowDrawer(false)}>✕</button>
                        </div>
                        <form className="p-6 space-y-4" onSubmit={handlesubmit}>
                            
                            <select
                                className="input input-bordered w-full bordered-3xl"
                                value={type}
                                onChange={e => setType(e.target.value)}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="upi">UPI</option>
                                <option value="card">Card</option>
                                <option value="bank">Bank</option>
                                <option value="phonepe">PhonePe</option>
                                <option value="Crypto">Crypto</option>
                            </select>

                            <input
                                className="input input-bordered w-full"
                                placeholder="For Crypto Define Crypto Label Eth,Usdt etc.."
                                value={label}
                                onChange={e => setLabel(e.target.value)}
                                required
                            />

                        
                            {type === "card" ? (
                                <div className="space-y-2">
                                    <input
                                        className="input input-bordered w-full"
                                        placeholder="Card Number"
                                        value={details.number || ""}
                                        onChange={e => setDetails({ ...details, number: e.target.value })}
                                        required
                                    />
                                    <input
                                        className="input input-bordered w-full"
                                        placeholder="Expiry (MM/YY)"
                                        value={details.expiry || ""}
                                        onChange={e => setDetails({ ...details, expiry: e.target.value })}
                                        required
                                    />
                                    <input
                                        className="input input-bordered w-full"
                                        placeholder="Cardholder Name"
                                        value={details.name || ""}
                                        onChange={e => setDetails({ ...details, name: e.target.value })}
                                        required
                                    />
                                </div>
                            ) : (
                                <input
                                    className="input input-bordered w-full"
                                    placeholder="Enter address of Your Selected Type"
                                    value={details}
                                    onChange={e => setDetails(e.target.value)}
                                    required
                                />
                            )}

                            <button className="btn btn-primary w-full mt-4" type="submit" disabled={isPending}>
                                Save
                            </button>
                        </form>
                    </div>
               
                    {showDrawer && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
                            onClick={() => setShowDrawer(false)}
                        />
                    )}
                </section>


                {
                    isLoading ? (
                        <div className="flex justify-center py-12">
                            <span className="loading loading-spinner loading-lg" />
                        </div>
                    ) : !showpaymentData?.details || showpaymentData.details.length === 0 ? (
                        <div className="card bg-base-200 p-6 text-center">

                            <h3 className="font-semibold text-lg mb-2">No Payment Data Found!</h3>
                        </div>
                    ) : (
                        <div className="w-full bg-base-200">
                            {showpaymentData.details.map((payment) => (
                                <PaymentCard key={payment._id} payment={payment} />
                            ))}
                        </div>
                    )}

            </div>

        </div>
    )
}

export default PaymentPage