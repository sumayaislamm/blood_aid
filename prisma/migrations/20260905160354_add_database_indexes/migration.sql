-- CreateIndex
CREATE INDEX "blood_request_requesterId_idx" ON "blood_request"("requesterId");

-- CreateIndex
CREATE INDEX "blood_request_bloodGroup_idx" ON "blood_request"("bloodGroup");

-- CreateIndex
CREATE INDEX "blood_request_city_idx" ON "blood_request"("city");

-- CreateIndex
CREATE INDEX "blood_request_status_idx" ON "blood_request"("status");

-- CreateIndex
CREATE INDEX "blood_request_urgency_idx" ON "blood_request"("urgency");

-- CreateIndex
CREATE INDEX "blood_request_requiredDate_idx" ON "blood_request"("requiredDate");

-- CreateIndex
CREATE INDEX "donation_bloodRequestId_idx" ON "donation"("bloodRequestId");

-- CreateIndex
CREATE INDEX "donation_donorId_idx" ON "donation"("donorId");

-- CreateIndex
CREATE INDEX "donation_status_idx" ON "donation"("status");

-- CreateIndex
CREATE INDEX "donation_donationDate_idx" ON "donation"("donationDate");

-- CreateIndex
CREATE INDEX "donor_profile_bloodGroup_idx" ON "donor_profile"("bloodGroup");

-- CreateIndex
CREATE INDEX "donor_profile_city_idx" ON "donor_profile"("city");

-- CreateIndex
CREATE INDEX "donor_profile_isAvailable_idx" ON "donor_profile"("isAvailable");

-- CreateIndex
CREATE INDEX "donor_response_status_idx" ON "donor_response"("status");
