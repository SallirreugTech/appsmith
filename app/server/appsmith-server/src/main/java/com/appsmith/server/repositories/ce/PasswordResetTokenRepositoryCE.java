package com.appsmith.server.repositories.ce;

import com.appsmith.server.domains.PasswordResetToken;
import com.appsmith.server.repositories.BaseRepository;

import java.util.Optional;

public interface PasswordResetTokenRepositoryCE extends BaseRepository<PasswordResetToken, String> {

    Optional<PasswordResetToken> findByEmail(String email);
}
